package com.myprojects.marketplace.controller;

import com.myprojects.marketplace.dto.UserDTO;
import com.myprojects.marketplace.entity.Role;
import com.myprojects.marketplace.entity.User;
import com.myprojects.marketplace.repository.RoleRepository;
import com.myprojects.marketplace.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (!StringUtils.hasText(request.getUsername()) || !StringUtils.hasText(request.getEmail()) || !StringUtils.hasText(request.getPassword())) {
            return ResponseEntity.badRequest().body("username, email and password are required");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already in use");
        }
        Role customerRole = roleRepository.findByName("CUSTOMER").orElseThrow(() -> new IllegalStateException("Missing CUSTOMER role"));
        User user = User.builder()
                .username(request.getUsername().trim())
                .email(request.getEmail().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(customerRole)
                .build();
        userRepository.save(user);
        UserDTO dto = UserDTO.builder().id(user.getId()).username(user.getUsername()).email(user.getEmail()).build();
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request == null || !StringUtils.hasText(request.getUsernameOrEmail()) || !StringUtils.hasText(request.getPassword())) {
            return ResponseEntity.badRequest().body("usernameOrEmail and password are required");
        }
        String identifier = request.getUsernameOrEmail().trim();
        // Resolve canonical principal: prefer email if found, else username
        User existing = userRepository.findByEmail(identifier)
                .or(() -> userRepository.findByUsername(identifier))
                .orElse(null);
        if (existing == null) {
            // Do not leak which field is wrong
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(identifier, request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            UserDTO dto = UserDTO.builder().id(existing.getId()).username(existing.getUsername()).email(existing.getEmail()).build();
            return ResponseEntity.ok(dto);
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @Data
    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
    }

    @Data
    public static class LoginRequest {
        private String usernameOrEmail;
        private String password;
    }
}
