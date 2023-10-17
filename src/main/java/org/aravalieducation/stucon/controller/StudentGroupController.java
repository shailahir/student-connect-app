package org.aravalieducation.stucon.controller;

import org.aravalieducation.stucon.entity.Group;
import org.aravalieducation.stucon.entity.GroupMembership;
import org.aravalieducation.stucon.entity.Student;
import org.aravalieducation.stucon.model.AddStudentToGroupRequest;
import org.aravalieducation.stucon.model.GroupStudentsRequest;
import org.aravalieducation.stucon.model.RemoveStudentFromGroupRequest;
import org.aravalieducation.stucon.model.StudentGroupsRequest;
import org.aravalieducation.stucon.service.StudentGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/student-groups-membership", produces = "application/json")
public class StudentGroupController {

    @Autowired
    private StudentGroupService studentGroupService;

    @PostMapping
    public ResponseEntity<GroupMembership> addStudentToGroup(@RequestBody AddStudentToGroupRequest addStudentToGroupRequest) {
        GroupMembership groupMembership = studentGroupService.addStudentToGroup(addStudentToGroupRequest);
        return new ResponseEntity<>(groupMembership, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<GroupMembership> removeStudentFromGroup(@RequestBody RemoveStudentFromGroupRequest removeStudentFromGroupRequest) {
        GroupMembership groupMembership = studentGroupService.removeStudentFromGroup(removeStudentFromGroupRequest);
        return new ResponseEntity<>(groupMembership, HttpStatus.OK);
    }

    @PutMapping("/groups-for-student")
    public ResponseEntity<List<GroupMembership>> updateGroupsForStudent(@RequestBody StudentGroupsRequest studentGroupsRequest) {
        List<GroupMembership> groupMembershipList = studentGroupService.updateGroupsForStudent(studentGroupsRequest);
        return new ResponseEntity<>(groupMembershipList, HttpStatus.OK);
    }

    @PutMapping("/students-for-group")
    public ResponseEntity<List<GroupMembership>> updateStudentsForGroup(@RequestBody GroupStudentsRequest groupStudentsRequest) {
        List<GroupMembership> groupMembershipList = studentGroupService.updateStudentsForGroup(groupStudentsRequest);
        return new ResponseEntity<>(groupMembershipList, HttpStatus.OK);
    }

    @GetMapping("/students-for-group/{groupId}")
    public ResponseEntity<List<Student>> getAllStudentsInGroup(@PathVariable("groupId") String groupId) {
        List<Student> studentList = studentGroupService.getAllStudentsInGroup(groupId);
        return new ResponseEntity<>(studentList, HttpStatus.OK);
    }

    @GetMapping("/groups-for-student/{rollNumber}")
    public ResponseEntity<List<Group>> getAllGroupsOfStudent(@PathVariable("rollNumber") String rollNumber) {
        List<Group> groups = studentGroupService.getAllGroupsOfStudent(rollNumber);
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

}
