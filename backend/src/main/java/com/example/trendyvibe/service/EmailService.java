package com.example.trendyvibe.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Async
    public void sendOrderConfirmation(String toEmail, String name, Long orderId, Double total, String address) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(resendApiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("from", "ShopEase <onboarding@resend.dev>");
            body.put("to", new String[]{toEmail});
            body.put("subject", "Order Confirmed - ShopEase #" + orderId);
            body.put("text",
                    "Hi " + name + "! \n\n" +
                            "Your order has been placed successfully!\n\n" +
                            "Order ID: #" + orderId + "\n" +
                            "Total: Rs." + total + "\n" +
                            "Delivery Address: " + address + "\n\n" +
                            "We'll notify you once it's shipped!\n\n" +
                            "Thank you for shopping with ShopEase"
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            restTemplate.postForObject("https://api.resend.com/emails", request, String.class);

            System.out.println("Email sent successfully to " + toEmail);
        } catch (Exception e) {
            System.out.println("Email failed: " + e.getMessage());
        }
    }
}