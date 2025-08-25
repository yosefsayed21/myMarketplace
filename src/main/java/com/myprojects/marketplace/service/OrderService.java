package com.myprojects.marketplace.service;

import com.myprojects.marketplace.dto.OrderDTO;
import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO dto);
    OrderDTO getOrderById(Long id);
    List<OrderDTO> getAllOrders();
    List<OrderDTO> getOrdersByUser(Long userId);
    OrderDTO updateOrder(Long id, OrderDTO dto);
    void deleteOrder(Long id);
}
