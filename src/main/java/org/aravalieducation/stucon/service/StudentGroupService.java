package org.aravalieducation.stucon.service;

import org.aravalieducation.stucon.entity.Group;
import org.aravalieducation.stucon.entity.GroupMembership;
import org.aravalieducation.stucon.entity.Student;
import org.aravalieducation.stucon.model.*;

import java.util.List;

public interface StudentGroupService {
    GroupMembership addStudentToGroup(AddStudentToGroupRequest addStudentToGroupRequest);

    GroupMembership removeStudentFromGroup(RemoveStudentFromGroupRequest removeStudentFromGroupRequest);

    List<StudentGroupNamesResponse> getAllStudentGroupNames();

    List<Group> getAllGroupsOfStudent(String rollNumber);

    List<Student> getAllStudentsInGroup(String groupId);

    List<GroupMembership> updateGroupsForStudent(StudentGroupsRequest studentGroupsRequest);

    List<GroupMembership> updateStudentsForGroup(GroupStudentsRequest groupStudentsRequest);
}
