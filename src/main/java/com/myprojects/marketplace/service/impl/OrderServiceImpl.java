package com.myprojects.marketplace.service.impl;

import com.myprojects.marketplace.dto.OrderDTO;
import com.myprojects.marketplace.entity.*;
import com.myprojects.marketplace.repository.OrderRepository;
import com.myprojects.marketplace.repository.ProductRepository;
import com.myprojects.marketplace.repository.UserRepository;
import com.myprojects.marketplace.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private OrderDTO toDto(Order o) {
        List<Long> pids = o.getItems() == null ? List.of() : o.getItems().stream().map(item -> item.getProduct().getId()).collect(Collectors.toList());
        double total = o.getTotalAmount() != null ? o.getTotalAmount().doubleValue() : 0.0;
        return new OrderDTO(o.getId(), o.getUser().getId(), o.getStatus(), total, pids);
    }

    @Override
    public OrderDTO createOrder(OrderDTO dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Product> products = dto.getProductIds() == null ? List.of()
                : productRepository.findAllById(dto.getProductIds());

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(dto.getStatus() == null ? "PENDING" : dto.getStatus());

        // build items and total
        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> items = products.stream().map(p -> {
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(p);
            oi.setQuantity(1); // simple default
            oi.setPrice(p.getPrice());
            return oi;
        }).collect(Collectors.toList());

        for (OrderItem oi : items) total = total.add(oi.getPrice().multiply(BigDecimal.valueOf(oi.getQuantity())));

        order.setItems(items);
        order.setTotalAmount(total);

        Order saved = orderRepository.save(order); // cascade items
        return toDto(saved);
    }

    @Override
    public OrderDTO getOrderById(Long id) { return orderRepository.findById(id).map(this::toDto).orElse(null); }

    @Override
    public List<OrderDTO> getAllOrders() { return orderRepository.findAll().stream().map(this::toDto).collect(Collectors.toList()); }

    @Override
    public List<OrderDTO> getOrdersByUser(Long userId) { return orderRepository.findByUserId(userId).stream().map(this::toDto).collect(Collectors.toList()); }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO dto) {
        return orderRepository.findById(id).map(o -> {
            if (dto.getStatus() != null) o.setStatus(dto.getStatus());
            Order saved = orderRepository.save(o);
            return toDto(saved);
        }).orElse(null);
    }

    @Override
    public void deleteOrder(Long id) { orderRepository.deleteById(id); }
}
