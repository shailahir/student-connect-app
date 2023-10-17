package org.aravalieducation.stucon.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "groups", schema = "app")
public class Group {

    @Id
    @Column(name = "id", unique = true, nullable = false, length = 40)
    private String id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "description", length = 3000, nullable = false)
    private String description;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    @JsonManagedReference("groupMembershipsGroupRef")
    private List<GroupMembership> groupMemberships;

    @OneToMany(mappedBy = "group", fetch = FetchType.EAGER)
    @JsonManagedReference("groupsHistoriesGroupRef")
    private List<GroupsHistory> groupsHistories;

    public Group() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<GroupMembership> getGroupMemberships() {
        return this.groupMemberships;
    }

    public void setGroupMemberships(List<GroupMembership> groupMemberships) {
        this.groupMemberships = groupMemberships;
    }

    public GroupMembership addGroupMembership(GroupMembership groupMembership) {
        getGroupMemberships().add(groupMembership);
        groupMembership.setGroup(this);

        return groupMembership;
    }

    public GroupMembership removeGroupMembership(GroupMembership groupMembership) {
        getGroupMemberships().remove(groupMembership);
        groupMembership.setGroup(null);

        return groupMembership;
    }

    public List<GroupsHistory> getGroupsHistories() {
        return this.groupsHistories;
    }

    public void setGroupsHistories(List<GroupsHistory> groupsHistories) {
        this.groupsHistories = groupsHistories;
    }

    public GroupsHistory addGroupsHistory(GroupsHistory groupsHistory) {
        getGroupsHistories().add(groupsHistory);
        groupsHistory.setGroup(this);

        return groupsHistory;
    }

    public GroupsHistory removeGroupsHistory(GroupsHistory groupsHistory) {
        getGroupsHistories().remove(groupsHistory);
        groupsHistory.setGroup(null);

        return groupsHistory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Group group = (Group) o;
        return Objects.equals(id, group.id) && Objects.equals(name, group.name) && Objects.equals(description, group.description) && Objects.equals(groupMemberships, group.groupMemberships) && Objects.equals(groupsHistories, group.groupsHistories);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, groupMemberships, groupsHistories);
    }

    @Override
    public String toString() {
        return "Group{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", groupMemberships=" + groupMemberships +
                ", groupsHistories=" + groupsHistories +
                '}';
    }
}