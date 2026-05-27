package com.example.authurole.controller;

import com.example.authurole.config.JwtUtil;
import com.example.authurole.model.User;
import com.example.authurole.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username required"));
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Password required"));
            }
            if (user.getUsername().length() < 3) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username must be at least 3 characters"));
            }
            if (user.getPassword().length() < 6) {
                return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 6 characters"));
            }
            if (userRepository.existsByUsername(user.getUsername())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("USER");
            }
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(Map.of(
                    "message", "User registered successfully",
                    "username", savedUser.getUsername(),
                    "role", savedUser.getRole()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            Optional<User> userOpt = userRepository.findByUsername(username);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
                return ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "token", token,
                        "username", user.getUsername(),
                        "role", user.getRole()
                ));
            }
            return ResponseEntity.status(401).body(Map.of("error", "User not found"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials ❌"));
        }
    }
}