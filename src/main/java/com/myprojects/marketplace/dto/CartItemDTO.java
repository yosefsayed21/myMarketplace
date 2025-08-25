package com.myprojects.marketplace.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private Long id;
    private int quantity;
    private ProductDTO product;
    private BigDecimal subtotal;
}
