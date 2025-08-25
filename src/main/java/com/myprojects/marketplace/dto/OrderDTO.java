package com.myprojects.marketplace.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private Long userId;
    private String status;
    private double totalAmount;
    private List<Long> productIds; // simple representation for create/update
}
