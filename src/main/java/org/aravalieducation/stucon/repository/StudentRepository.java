package org.aravalieducation.stucon.repository;

import org.aravalieducation.stucon.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
//
//    List<Student> findAllByGroupId(String groupId);
//
//    List<Student> findAllByGroupName(String groupName);
//
//    List<Student> findAllByGroupCode(String groupCode);
}
