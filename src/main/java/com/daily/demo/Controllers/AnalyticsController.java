package com.daily.demo.Controllers;

import com.daily.demo.DTO.ApiResponse;
import com.daily.demo.DTO.ProgressResponseDTO;
import com.daily.demo.Entities.User;
import com.daily.demo.Service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/progress")
    public ResponseEntity<ApiResponse<ProgressResponseDTO>> getProgress(
            @RequestParam(defaultValue = "7") int days,
            @AuthenticationPrincipal User user) {

        ProgressResponseDTO progress = analyticsService.getProgress(user.getId(), days);
        return ResponseEntity.ok(ApiResponse.success(progress, "Analytics fetched successfully"));
    }
}
