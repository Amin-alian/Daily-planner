package com.daily.demo.Repositories;

import com.daily.demo.Entities.TaskTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskTemplateRepository extends JpaRepository<TaskTemplate, Long> {
    List<TaskTemplate> findAllByUserIdAndIsActiveTrue(Long userId);
    long countByUserIdAndIsActiveTrue(Long userId);
}
