package com.example.trendyvibe.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;      // Cart owner
    private Long productId;   // Product identifier
    private String size;      // Product size
    private Integer qty;      // Product quantity
}