package com.example.trendyvibe.controller;

import com.example.trendyvibe.model.User;
import com.example.trendyvibe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    // Admin — all users
    @GetMapping("/api/admin/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}