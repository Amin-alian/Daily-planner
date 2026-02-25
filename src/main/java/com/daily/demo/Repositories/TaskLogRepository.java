package com.daily.demo.Repositories;

import com.daily.demo.Entities.TaskLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TaskLogRepository extends JpaRepository<TaskLog, Long> {
    Optional<TaskLog> findByTaskTemplateIdAndLogDate(Long taskTemplateId, LocalDate logDate);
    List<TaskLog> findAllByTaskTemplateUserIdAndLogDate(Long userId, LocalDate logDate);

    @Query("SELECT COUNT(l) FROM TaskLog l WHERE l.taskTemplate.user.id = :userId AND l.status = 'COMPLETED' AND l.logDate >= :startDate AND l.logDate <= :endDate")
    long countCompletedTasksBetweenDates(@Param("userId") Long userId, @Param("startDate")      LocalDate startDate, @Param("endDate") LocalDate endDate);
}
