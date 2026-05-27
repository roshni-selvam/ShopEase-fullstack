package com.example.authurole;

import com.example.authurole.model.User;
import com.example.authurole.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AuthuroleApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(AuthuroleApplication.class, args);
		System.out.println("🚀 Server started on http://localhost:8080");
	}

	@Override
	public void run(String... args) {
		// Create Admin
		if (!userRepository.existsByUsername("admin")) {
			User admin = new User();
			admin.setUsername("admin");
			admin.setPassword(passwordEncoder.encode("admin123"));
			admin.setRole("ADMIN");
			userRepository.save(admin);
			System.out.println("✅ Admin created: admin/admin123");
		}

		// Create Test User
		if (!userRepository.existsByUsername("user")) {
			User user = new User();
			user.setUsername("user");
			user.setPassword(passwordEncoder.encode("user123"));
			user.setRole("USER");
			userRepository.save(user);
			System.out.println("✅ User created: user/user123");
		}

		System.out.println("\n📊 Users in database:");
		userRepository.findAll().forEach(u ->
				System.out.println("   - " + u.getUsername() + " (Role: " + u.getRole() + ")")
		);
	}
}

