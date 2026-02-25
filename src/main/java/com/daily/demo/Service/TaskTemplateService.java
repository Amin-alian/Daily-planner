package com.daily.demo.Service;

import com.daily.demo.DTO.TaskRequestDTO;
import com.daily.demo.Entities.TaskTemplate;
import com.daily.demo.Entities.User;
import com.daily.demo.Repositories.TaskTemplateRepository;
import com.daily.demo.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskTemplateService {
    private final TaskTemplateRepository taskTemplateRepository;
    private final UserRepository userRepository;

    public TaskTemplate createTaskTemplate(TaskRequestDTO request , Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        TaskTemplate taskTemplate = TaskTemplate.builder()
                .user(user)
                .title(request.getTitle())
                .category(request.getCategory())
                .isActive(true)
                .build();
        return taskTemplateRepository.save(taskTemplate);
    }

    public List<TaskTemplate> getAllActiveTaskTemplates(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return taskTemplateRepository.findAllByUserIdAndIsActiveTrue(user.getId());
    }
}
