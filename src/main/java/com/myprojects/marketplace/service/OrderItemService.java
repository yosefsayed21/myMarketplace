package com.myprojects.marketplace.service;

import com.myprojects.marketplace.entity.OrderItem;
import com.myprojects.marketplace.repository.OrderItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public List<OrderItem> getItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrder_Id(orderId);
    }

    @Transactional
    public OrderItem save(OrderItem item) {
        return orderItemRepository.save(item);
    }

    @Transactional
    public void delete(Long id) {
        orderItemRepository.deleteById(id);
    }
}
