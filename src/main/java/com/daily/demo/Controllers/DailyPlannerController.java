package com.daily.demo.Controllers;

import com.daily.demo.DTO.ApiResponse;
import com.daily.demo.DTO.DailyTaskDTO;
import com.daily.demo.Entities.User;
import com.daily.demo.Service.DailyPlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/planner")
@RequiredArgsConstructor
public class DailyPlannerController {

    private final DailyPlannerService plannerService;

    @GetMapping("/today")
    public ResponseEntity<ApiResponse<List<DailyTaskDTO>>> getTodayTasks(
            @AuthenticationPrincipal User user) { // Spring automatically injects the logged-in user here!

        LocalDate today = LocalDate.now();
        List<DailyTaskDTO> tasks = plannerService.getTasksForDate(user.getId(), today);
        return ResponseEntity.ok(ApiResponse.success(tasks, "Fetched today's tasks"));
    }

    @PostMapping("/toggle/{templateId}")
    public ResponseEntity<ApiResponse<Void>> toggleTask(
            @PathVariable Long templateId,
            @AuthenticationPrincipal User user) {

        LocalDate today = LocalDate.now();
        plannerService.toggleTaskStatus(templateId, today);
        return ResponseEntity.ok(ApiResponse.success(null, "Task status toggled successfully"));
    }
}
