package com.daily.demo.Repositories;

import com.daily.demo.Entities.TaskTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskTemplateRepository extends JpaRepository<TaskTemplate, Long> {
    List<TaskTemplate> findAllByUserIdAndIsActiveTrue(Long userId);
    long countByUserIdAndIsActiveTrue(Long userId);
    Optional<TaskTemplate> findByIdAndUserIdAndIsActiveTrue(Long id, Long userId);
}
