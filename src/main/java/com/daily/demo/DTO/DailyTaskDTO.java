package com.daily.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DailyTaskDTO {
    private Long taskId;
    private String title;
    private String category;
    private String status;
}
