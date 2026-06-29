package com.example.trendyvibe.service;

import com.example.trendyvibe.model.Order;
import com.example.trendyvibe.model.User;
import com.example.trendyvibe.repository.CartRepository;
import com.example.trendyvibe.repository.OrderRepository;
import com.example.trendyvibe.repository.UserRepository;
import com.example.trendyvibe.security.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    private User getUserFromToken(String token) {

        String email = jwtUtil.extractEmail(
                token.replace("Bearer ", "")
        );

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found!")
                );
    }

    // PLACE ORDER
    @Transactional
    public Order placeOrder(String token, Order order) {

        User user = getUserFromToken(token);

        order.setUserId(user.getId());
        order.setCustomerName(user.getName());
        order.setStatus("PENDING");

        order.setOrderNumber(
                "ORD-" + System.currentTimeMillis()
        );

        // SAVE ORDER
        Order savedOrder = orderRepository.save(order);

        // CLEAR CART
        cartRepository.deleteByUserId(user.getId());

        // SEND EMAIL
        try {

            emailService.sendOrderConfirmation(
                    user.getEmail(),
                    user.getName(),
                    savedOrder.getId(),
                    savedOrder.getTotalPrice(),
                    savedOrder.getAddress()
            );

        } catch (Exception e) {

            System.out.println(
                    "Email failed: " + e.getMessage()
            );
        }

        return savedOrder;
    }

    // USER ORDERS
    public List<Order> getUserOrders(String token) {

        User user = getUserFromToken(token);

        return orderRepository.findByUserId(user.getId());
    }

    // ADMIN ALL ORDERS
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    // UPDATE STATUS
    @Transactional
    public Order updateStatus(Long id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found!")
                );

        order.setStatus(status);

        return orderRepository.save(order);
    }
}