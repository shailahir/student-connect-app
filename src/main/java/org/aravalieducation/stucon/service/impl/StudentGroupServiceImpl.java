package org.aravalieducation.stucon.service.impl;

import jakarta.transaction.Transactional;
import org.aravalieducation.stucon.dao.StudentGroupDao;
import org.aravalieducation.stucon.entity.Group;
import org.aravalieducation.stucon.entity.GroupMembership;
import org.aravalieducation.stucon.entity.Student;
import org.aravalieducation.stucon.model.*;
import org.aravalieducation.stucon.repository.GroupRepository;
import org.aravalieducation.stucon.repository.StudentGroupMembershipRepository;
import org.aravalieducation.stucon.repository.StudentRepository;
import org.aravalieducation.stucon.service.StudentGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentGroupServiceImpl implements StudentGroupService {

    @Autowired
    private StudentGroupMembershipRepository studentGroupMembershipRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private StudentGroupDao studentGroupDao;

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public GroupMembership addStudentToGroup(AddStudentToGroupRequest addStudentToGroupRequest) {
        // Check If a membership already exist for this pair
        GroupMembership exists = studentGroupMembershipRepository.findByStudentRollNumberAndGroupId(addStudentToGroupRequest.getStudentId(),
                addStudentToGroupRequest.getGroupId());
        if (exists != null) {
            // Return the existing pair
            return exists;
        }
        // when does not exist, create and save
        GroupMembership groupMembership = new GroupMembership();
        groupMembership.setId(UUID.randomUUID().toString());

        Optional<Student> studentOpt = studentRepository.findById(addStudentToGroupRequest.getStudentId());
        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student does not exist");
        }
        Student student = studentOpt.get();
        groupMembership.setStudent(student);

        Optional<Group> groupOptional = groupRepository.findById(addStudentToGroupRequest.getGroupId());
        if (groupOptional.isEmpty()) {
            throw new RuntimeException("Group does not exist");
        }
        Group group = groupOptional.get();
        groupMembership.setGroup(group);
        groupMembership.setAddedOn(Timestamp.from(java.time.Instant.now()));

        GroupMembership result = studentGroupMembershipRepository.save(groupMembership);
        return result;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public GroupMembership removeStudentFromGroup(RemoveStudentFromGroupRequest removeStudentFromGroupRequest) {
        GroupMembership groupMembership = studentGroupMembershipRepository.findByStudentRollNumberAndGroupId(
                removeStudentFromGroupRequest.getStudentId(), removeStudentFromGroupRequest.getGroupId());

        if (groupMembership != null) {
            studentGroupMembershipRepository.delete(groupMembership);
            return groupMembership;
        } else {
            return null;
        }
    }

    @Override
    // TODO: Revisit
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<StudentGroupNamesResponse> getAllStudentGroupNames() {
        List<GroupMembership> listOfMemberships = studentGroupMembershipRepository.findAll();
        if (listOfMemberships != null) {
            Map<String, Integer> groups = new HashMap<>();
//            for(int i = 0; i < listOfMemberships.size(); i+=1) {
//                GroupMembership groupMembership = listOfMemberships.get(i);
//
//            }

        }
        return null;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<Group> getAllGroupsOfStudent(String rollNumber) {
        List<GroupMembership> listOfMembers = studentGroupMembershipRepository.findByStudentRollNumber(rollNumber);
        List<Group> groupList = new ArrayList<>();
        if (listOfMembers != null && listOfMembers.size() > 0) {
            groupList = listOfMembers.stream().map(r -> r.getGroup()).collect(Collectors.toList());
        }
        return groupList;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<Student> getAllStudentsInGroup(String groupId) {
        List<GroupMembership> listOfMembers = studentGroupMembershipRepository.findByGroupId(groupId);
        List<Student> studentList = new ArrayList<>();
        if (listOfMembers != null && listOfMembers.size() > 0) {
            studentList = listOfMembers.stream().map(r -> r.getStudent()).collect(Collectors.toList());
        }
        return studentList;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<GroupMembership> updateGroupsForStudent(StudentGroupsRequest studentGroupsRequest) {
        List<GroupMembership> groupMembershipList = studentGroupDao.updateGroupsForStudent(studentGroupsRequest);
        return groupMembershipList;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<GroupMembership> updateStudentsForGroup(GroupStudentsRequest groupStudentsRequest) {
        List<GroupMembership> groupMembershipList = studentGroupDao.updateStudentsForGroup(groupStudentsRequest);
        return groupMembershipList;
    }
}
