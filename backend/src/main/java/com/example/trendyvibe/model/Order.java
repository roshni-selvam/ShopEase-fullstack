package com.example.trendyvibe.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.time.Year;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String orderNumber;

    private Long userId;
    private  String customerName;

    @Column(columnDefinition = "TEXT")
    private String items;

    private Double totalPrice;
    private String address;
    private String paymentMethod;
    private String status = "PENDING";
    private LocalDateTime createdAt = LocalDateTime.now();
    private String phoneNumber;


}