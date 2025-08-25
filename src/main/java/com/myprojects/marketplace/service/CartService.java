package com.myprojects.marketplace.service;

import com.myprojects.marketplace.dto.CartDTO;

import java.util.List;

public interface CartService {
    CartDTO createCart(CartDTO dto);
    CartDTO getCartById(Long id);
    CartDTO getCartByUser(Long userId);
    List<CartDTO> getAllCarts();
    CartDTO updateCart(Long id, CartDTO dto);
    void deleteCart(Long id);
}
