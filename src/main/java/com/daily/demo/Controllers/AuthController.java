package com.daily.demo.Controllers;

import com.daily.demo.DTO.ApiResponse;
import com.daily.demo.DTO.AuthRequestDTO;
import com.daily.demo.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService; // You will need to create this service to handle DB saving/password checking

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody AuthRequestDTO request) {
        String token = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(token, "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody AuthRequestDTO request) {
        String token = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(token, "Login successful"));
    }
}
