package com.myprojects.marketplace.service;

import com.myprojects.marketplace.entity.CartItem;
import com.myprojects.marketplace.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;

    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public List<CartItem> getItemsByCartId(Long cartId) {
        return cartItemRepository.findByCart_Id(cartId);
    }

    public Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId) {
        return cartItemRepository.findByCart_IdAndProduct_Id(cartId, productId);
    }

    @Transactional
    public CartItem save(CartItem item) {
        return cartItemRepository.save(item);
    }

    @Transactional
    public void delete(Long id) {
        cartItemRepository.deleteById(id);
    }
}
