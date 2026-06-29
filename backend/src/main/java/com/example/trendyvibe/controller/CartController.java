package com.example.trendyvibe.controller;

import com.example.trendyvibe.model.CartItem;
import com.example.trendyvibe.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // Cart பார்க்க
    @GetMapping
    public List<CartItem> getCart(@RequestHeader("Authorization") String token) {
        return cartService.getCart(token);
    }

    // Cart-ல add
    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(
            @RequestHeader("Authorization") String token,
            @RequestBody CartItem item) {
        return ResponseEntity.ok(cartService.addToCart(token, item));
    }

    // Qty update
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateQty(
            @PathVariable Long id,
            @RequestParam Integer qty) {
        return ResponseEntity.ok(cartService.updateQty(id, qty));
    }

    // Item remove
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeItem(@PathVariable Long id) {
        cartService.removeItem(id);
        return ResponseEntity.ok("Removed!");
    }

    // Cart clear
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(@RequestHeader("Authorization") String token) {
        cartService.clearCart(token);
        return ResponseEntity.ok("Cart cleared!");
    }
}