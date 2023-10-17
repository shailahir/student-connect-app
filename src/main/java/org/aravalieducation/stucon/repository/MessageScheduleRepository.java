package org.aravalieducation.stucon.repository;

import org.aravalieducation.stucon.entity.MessageSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface MessageScheduleRepository extends JpaRepository<MessageSchedule, String> {
    List<MessageSchedule> findAllBySchedulerStatusId(Integer statusId);

    List<MessageSchedule> findAllBySchedulerStatusIdAndScheduledToRunAtBefore(int schedulerStatusId, Timestamp from);

    List<MessageSchedule> findAllBySchedulerStatusIdInAndScheduledToRunAtBefore(List<Integer> integers, Timestamp from);
}
