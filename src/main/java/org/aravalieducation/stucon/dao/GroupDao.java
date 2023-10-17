package org.aravalieducation.stucon.dao;

import org.aravalieducation.stucon.entity.Group;

import java.util.List;

public interface GroupDao {
    Group addGroup(Group group);

    Group updateGroup(Group group);

    Group getGroupByGroupId(String groupId);

    List<Group> getAllGroups();

    Group deleteGroupByGroupId(String groupId);
}
