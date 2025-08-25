package com.myprojects.marketplace.service.impl;

import com.myprojects.marketplace.dto.CartDTO;
import com.myprojects.marketplace.dto.CartItemDTO;
import com.myprojects.marketplace.dto.ProductDTO;
import com.myprojects.marketplace.entity.Cart;
import com.myprojects.marketplace.entity.CartItem;
import com.myprojects.marketplace.entity.Product;
import com.myprojects.marketplace.entity.User;
import com.myprojects.marketplace.repository.CartRepository;
import com.myprojects.marketplace.repository.ProductRepository;
import com.myprojects.marketplace.repository.UserRepository;
import com.myprojects.marketplace.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public CartDTO createCart(CartDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = new Cart();
        cart.setUser(user);

        Cart saved = cartRepository.save(cart);
        return convertToDTO(saved);
    }

    @Override
    public CartDTO getCartById(Long id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        return convertToDTO(cart);
    }

    @Override
    public CartDTO getCartByUser(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user"));
        return convertToDTO(cart);
    }

    @Override
    public List<CartDTO> getAllCarts() {
        return cartRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CartDTO updateCart(Long id, CartDTO dto) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        // For simplicity, replacing items is skipped here, but can be added
        return convertToDTO(cartRepository.save(cart));
    }

    @Override
    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    // ================== Helper ==================
    private CartDTO convertToDTO(Cart cart) {
        BigDecimal totalPrice = cart.getItems().stream()
                .map(item -> item.getProduct().getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartDTO.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .items(cart.getItems().stream()
                        .map(this::convertItemToDTO)
                        .collect(Collectors.toList()))
                .totalPrice(totalPrice)
                .build();
    }

    private CartItemDTO convertItemToDTO(CartItem item) {
        Product product = item.getProduct();
        return CartItemDTO.builder()
                .id(item.getId())
                .quantity(item.getQuantity())
                .product(ProductDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .build())
                .build();
    }
}
