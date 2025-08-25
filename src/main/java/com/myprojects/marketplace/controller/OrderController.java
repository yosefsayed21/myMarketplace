package com.myprojects.marketplace.controller;

import com.myprojects.marketplace.dto.OrderDTO;
import com.myprojects.marketplace.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public OrderDTO create(@RequestBody OrderDTO dto) { return orderService.createOrder(dto); }

    @GetMapping("/{id}")
    public OrderDTO get(@PathVariable Long id) { return orderService.getOrderById(id); }

    @GetMapping
    public List<OrderDTO> getAll() { return orderService.getAllOrders(); }

    @GetMapping("/user/{userId}")
    public List<OrderDTO> byUser(@PathVariable Long userId) { return orderService.getOrdersByUser(userId); }

    @PutMapping("/{id}")
    public OrderDTO update(@PathVariable Long id, @RequestBody OrderDTO dto) { return orderService.updateOrder(id, dto); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { orderService.deleteOrder(id); }
}
