package com.daily.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApiResponse <T>{
    private boolean success;
    private String message;
    private LocalDateTime timestamp;
    private T data;

    public static <T> ApiResponse<T> success(T data , String message) {
        return new ApiResponse<>(true , message , LocalDateTime.now() , data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false , message , LocalDateTime.now() , null);
    }
}
