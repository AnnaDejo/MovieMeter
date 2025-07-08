package com.example.backend.controller;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email is already registered.";
        }

        // Validate password
        String password = user.getPassword();
        if (!isValidPassword(password)) {
            return "Password must be at least 8 characters and include a special character.";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Registration successful!";
    }

    private boolean isValidPassword(String password) {
        // Minimum 8 characters, at least one special character
        return password.length() >= 8 && Pattern.compile("[^a-zA-Z0-9]").matcher(password).find();
    }
}
