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

    private Long userId;      // யாருடைய cart
    private Long productId;   // எந்த product
    private String size;      // size
    private Integer qty;      // quantity
}