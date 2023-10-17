package org.aravalieducation.stucon.service.impl;

import org.aravalieducation.stucon.dao.GroupDao;
import org.aravalieducation.stucon.entity.Group;
import org.aravalieducation.stucon.repository.GroupRepository;
import org.aravalieducation.stucon.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private GroupDao groupDao;

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Group addGroup(Group group) {
        Group addedGroup = groupDao.addGroup(group);
        return addedGroup;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Group updateGroup(Group group) {
        Group updatedGroup = groupDao.updateGroup(group);
        return updatedGroup;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Group deleteGroupByGroupId(String groupId) {
        Group deletedGroup = groupDao.deleteGroupByGroupId(groupId);
        return deletedGroup;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<Group> getAllGroups() {
        List<Group> groups = groupDao.getAllGroups();
        return groups;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Group getGroupByGroupId(String groupId) {
        Group group = groupDao.getGroupByGroupId(groupId);
        return group;
    }
}
