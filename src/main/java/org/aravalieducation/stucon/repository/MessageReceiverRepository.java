package org.aravalieducation.stucon.repository;

import org.aravalieducation.stucon.entity.MessageReceiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageReceiverRepository extends JpaRepository<MessageReceiver, String> {
}
