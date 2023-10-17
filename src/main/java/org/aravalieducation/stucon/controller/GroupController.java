package org.aravalieducation.stucon.controller;

import org.aravalieducation.stucon.entity.Group;
import org.aravalieducation.stucon.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/student-groups", produces = "application/json")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping
    public ResponseEntity<Group> addGroup(@RequestBody Group group) {
        Group addedGroup = groupService.addGroup(group);
        return new ResponseEntity<>(addedGroup, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Group> updateGroup(@RequestBody Group group) {
        Group updatedGroup = groupService.updateGroup(group);
        return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Group> deleteGroupByGroupId(@PathVariable("groupId") String groupId) {
        Group deletedGroup = groupService.deleteGroupByGroupId(groupId);
        return new ResponseEntity<>(deletedGroup, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = groupService.getAllGroups();
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<Group> getGroupByGroupId(@PathVariable("groupId") String groupId) {
        Group group = groupService.getGroupByGroupId(groupId);
        return new ResponseEntity<>(group, HttpStatus.OK);
    }
}
