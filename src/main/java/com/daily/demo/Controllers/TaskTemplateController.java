package com.daily.demo.Controllers;

import com.daily.demo.DTO.ApiResponse;
import com.daily.demo.DTO.TaskRequestDTO;
import com.daily.demo.Entities.TaskTemplate;
import com.daily.demo.Entities.User;
import com.daily.demo.Service.TaskTemplateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskTemplateController {
    private final TaskTemplateService templateService;

    @PostMapping
    public ResponseEntity<ApiResponse<TaskTemplate>> createTask(
            @Valid @RequestBody TaskRequestDTO request,
            @AuthenticationPrincipal User user) {

        TaskTemplate savedTask = templateService.createTaskTemplate(request, user.getId());
        return ResponseEntity.ok(ApiResponse.success(savedTask, "Task created successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskTemplate>>> getActiveTasks(
            @AuthenticationPrincipal User user) {

        List<TaskTemplate> tasks = templateService.getAllActiveTaskTemplates(user.getId());
        return ResponseEntity.ok(ApiResponse.success(tasks, "Active tasks retrieved"));
    }
}
