package com.daily.demo.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskRequestDTO {
    @NotBlank(message = "Title is Required")
    private String title;
    private String category;
}
