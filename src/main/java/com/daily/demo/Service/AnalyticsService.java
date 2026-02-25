package com.daily.demo.Service;

import com.daily.demo.DTO.ProgressResponseDTO;
import com.daily.demo.Repositories.TaskLogRepository;
import com.daily.demo.Repositories.TaskTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AnalyticsService {
    private final TaskLogRepository logRepository;
    private final TaskTemplateRepository templateRepository;

    public AnalyticsService(TaskLogRepository logRepository, TaskTemplateRepository templateRepository) {
        this.logRepository = logRepository;
        this.templateRepository = templateRepository;
    }

    public ProgressResponseDTO getProgress(Long userId, int days) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days - 1);
        long activeTemplatesCount = templateRepository.countByUserIdAndIsActiveTrue(userId);
        long completedCount = logRepository.countCompletedTasksBetweenDates(userId, startDate, endDate);
        long totalExpected = activeTemplatesCount * days;
        double percentage = (totalExpected == 0) ? 0 : ((double) completedCount / totalExpected) * 100;

        return new ProgressResponseDTO(
                "LAST_" + days + "_DAYS",
                Math.round(percentage * 10.0) / 10.0,
                completedCount,
                totalExpected
        );
    }
}
