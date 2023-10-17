package org.aravalieducation.stucon.repository;

import org.aravalieducation.stucon.entity.StudentsHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHistoryRepository extends JpaRepository<StudentsHistory, String> {
}
