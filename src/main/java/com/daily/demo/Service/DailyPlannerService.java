package com.daily.demo.Service;

import com.daily.demo.DTO.DailyTaskDTO;
import com.daily.demo.Entities.TaskLog;
import com.daily.demo.Entities.TaskStatus;
import com.daily.demo.Entities.TaskTemplate;
import com.daily.demo.Repositories.TaskLogRepository;
import com.daily.demo.Repositories.TaskTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DailyPlannerService {
    private final TaskTemplateRepository taskTemplateRepository;
    private final TaskLogRepository taskLogRepository;

    public List<DailyTaskDTO> getTasksForDate(Long userId , LocalDate date) {
        List<TaskTemplate> templates =  taskTemplateRepository.findAllByUserIdAndIsActiveTrue(userId);
        List<TaskLog> logs = taskLogRepository.findAllByTaskTemplateUserIdAndLogDate(userId , date);

        return templates.stream().map(template -> {
            Optional<TaskLog> log = logs.stream()
                    .filter(l -> l.getTaskTemplate().getId().equals(template.getId()))
                    .findFirst();

            String status = log.map(l -> l.getStatus().toString()).orElse("PENDING");

            return new DailyTaskDTO(template.getId(), template.getTitle(), template.getCategory(), status);
        }).collect(Collectors.toList());
    }

    public void toggleTaskStatus(Long templateId, LocalDate date) {
        TaskTemplate template = taskTemplateRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found"));

        Optional<TaskLog> existingLog = taskLogRepository.findByTaskTemplateIdAndLogDate(templateId, date);

        if (existingLog.isPresent()) {
            // If it exists, we toggle it (e.g., if it was COMPLETED, make it PENDING/Delete it)
            taskLogRepository.delete(existingLog.get());
        } else {
            // If it doesn't exist, create a new COMPLETED log
            TaskLog newLog = new TaskLog();
            newLog.setTaskTemplate(template);
            newLog.setLogDate(date);
            newLog.setStatus(TaskStatus.COMPLETED);
            newLog.setCompletedAt(LocalDateTime.now());
            taskLogRepository.save(newLog);
        }
    }
}


