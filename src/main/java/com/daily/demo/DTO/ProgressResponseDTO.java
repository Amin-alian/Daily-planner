package com.daily.demo.DTO;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public class ProgressResponseDTO {
    private String period;
    private double completionPercentage;
    private long totalCompleted;
    private long totalExpected;

    public ProgressResponseDTO(String period, double completionPercentage, long totalCompleted, long totalExpected) {
        this.period = period;
        this.completionPercentage = completionPercentage;
        this.totalCompleted = totalCompleted;
        this.totalExpected = totalExpected;
    }

    public ProgressResponseDTO() {
    }

    public String getPeriod() {
        return period;
    }

    public double getCompletionPercentage() {
        return completionPercentage;
    }

    public long getTotalCompleted() {
        return totalCompleted;
    }

    public long getTotalExpected() {
        return totalExpected;
    }
}
