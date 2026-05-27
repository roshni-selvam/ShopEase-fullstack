package com.example.authurole.controller;

import com.example.authurole.model.User;
import com.example.authurole.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public ResponseEntity<?> hello() {
        return ResponseEntity.ok(Map.of("message", "Hello Admin! Full access granted"));
    }

    @GetMapping("/all-users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> userList = new ArrayList<>();
        for (User user : users) {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("username", user.getUsername());
            userMap.put("role", user.getRole());
            userList.add(userMap);
        }
        return ResponseEntity.ok(userList);
    }
    @DeleteMapping("/delete-user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
    @PutMapping("/update-role/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String newRole = request.get("role");

        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        User user = userRepository.findById(id).get();

        if (user.getUsername().equals("admin")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Cannot change admin role"));
        }

        user.setRole(newRole);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Role updated successfully", "newRole", newRole));
    }
}
