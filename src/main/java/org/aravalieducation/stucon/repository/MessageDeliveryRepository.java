package org.aravalieducation.stucon.repository;

import org.aravalieducation.stucon.entity.MessageDelivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageDeliveryRepository extends JpaRepository<MessageDelivery, String> {
}
