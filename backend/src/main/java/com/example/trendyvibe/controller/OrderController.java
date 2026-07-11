package com.example.trendyvibe.controller;

import com.example.trendyvibe.model.Order;
import com.example.trendyvibe.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // User — order place
    @PostMapping("/api/orders")
    public ResponseEntity<?> placeOrder(
            @RequestHeader("Authorization") String token,
            @RequestBody Order order) {
        try {
            Order saved = orderService.placeOrder(token, order);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Order Error: " + e.getMessage());
        }
    }

    // User — my orders
    @GetMapping("/api/orders")
    public List<Order> getUserOrders(@RequestHeader("Authorization") String token) {
        return orderService.getUserOrders(token);
    }

    // Admin — all orders
    @GetMapping("/api/admin/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Admin — status update
    @PutMapping("/api/admin/orders/{id}/status")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
    // TEMPORARY - Clear all orders (remove after use)
    @DeleteMapping("/api/admin/orders/clear-all")
    public String clearAllOrders() {
        orderService.deleteAllOrders();
        return "All orders deleted!";
    }
}