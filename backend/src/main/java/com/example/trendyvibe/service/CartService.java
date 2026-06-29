package com.example.trendyvibe.service;

import com.example.trendyvibe.model.CartItem;
import com.example.trendyvibe.model.User;
import com.example.trendyvibe.repository.CartRepository;
import com.example.trendyvibe.repository.UserRepository;
import com.example.trendyvibe.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    // Token-ல இருந்து user எடுக்கிறோம்
    private User getUserFromToken(String token) {
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }

    // Cart பார்க்கிறோம்
    public List<CartItem> getCart(String token) {
        User user = getUserFromToken(token);
        return cartRepository.findByUserId(user.getId());
    }

    // Cart-ல add பண்றோம்
    public CartItem addToCart(String token, CartItem item) {
        User user = getUserFromToken(token);
        item.setUserId(user.getId());

        // Same product + size already இருந்தா qty update
        List<CartItem> existing = cartRepository.findByUserId(user.getId());
        for (CartItem c : existing) {
            if (c.getProductId().equals(item.getProductId()) &&
                    c.getSize().equals(item.getSize())) {
                c.setQty(c.getQty() + 1);
                return cartRepository.save(c);
            }
        }
        item.setQty(item.getQty() == null ? 1 : item.getQty());
        return cartRepository.save(item);
    }

    // Qty update
    public CartItem updateQty(Long cartItemId, Integer qty) {
        CartItem item = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found!"));
        item.setQty(qty);
        return cartRepository.save(item);
    }

    // Remove item
    public void removeItem(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

    // Cart clear
    public void clearCart(String token) {
        User user = getUserFromToken(token);
        cartRepository.deleteByUserId(user.getId());
    }
}