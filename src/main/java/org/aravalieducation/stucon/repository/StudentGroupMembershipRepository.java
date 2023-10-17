package org.aravalieducation.stucon.repository;

import org.aravalieducation.stucon.entity.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGroupMembershipRepository extends JpaRepository<GroupMembership, String> {
    GroupMembership findByStudentRollNumberAndGroupId(String studentId, String groupId);

    List<GroupMembership> findByStudentRollNumber(String rollNumber);

    List<GroupMembership> findByGroupId(String groupId);
}
