package com.example.trendyvibe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendOrderConfirmation(String toEmail, String name, Long orderId, Double total, String address) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(" Order Confirmed - TrendyVibe #" + orderId);
            message.setText(
                    "Hi " + name + "! 🛍️\n\n" +
                            "Your order has been placed successfully!\n\n" +
                            "Order ID: #" + orderId + "\n" +
                            "Total: ₹" + total + "\n" +
                            "Delivery Address: " + address + "\n\n" +
                            "We'll notify you once it's shipped!\n\n" +
                            "Thank you for shopping with TrendyVibe 💕"
            );
            mailSender.send(message);
            System.out.println("Email sent successfully to " + toEmail);
        } catch (Exception e) {
            System.out.println("Email failed: " + e.getMessage());
        }
    }
}