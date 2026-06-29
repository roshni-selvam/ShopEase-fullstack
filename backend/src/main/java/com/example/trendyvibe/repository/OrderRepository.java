package com.example.trendyvibe.repository;

import com.example.trendyvibe.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findAllByOrderByCreatedAtDesc();
}