package org.aravalieducation.stucon.dao;

import org.aravalieducation.stucon.entity.GroupMembership;
import org.aravalieducation.stucon.model.GroupStudentsRequest;
import org.aravalieducation.stucon.model.StudentGroupsRequest;

import java.util.List;

public interface StudentGroupDao {
    List<GroupMembership> updateGroupsForStudent(StudentGroupsRequest studentGroupsRequest);

    List<GroupMembership> updateStudentsForGroup(GroupStudentsRequest groupStudentsRequest);
}
