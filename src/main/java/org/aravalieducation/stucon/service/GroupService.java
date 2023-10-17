package org.aravalieducation.stucon.service;

import org.aravalieducation.stucon.entity.Group;

import java.util.List;

public interface GroupService {
    Group addGroup(Group group);

    Group updateGroup(Group group);

    Group deleteGroupByGroupId(String groupId);

    List<Group> getAllGroups();

    Group getGroupByGroupId(String groupId);
}
