package org.aravalieducation.stucon.repository;

import org.aravalieducation.stucon.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    Message findByMessageSchedulesId(String id);
}
