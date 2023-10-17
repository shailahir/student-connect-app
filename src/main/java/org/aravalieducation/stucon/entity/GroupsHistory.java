package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Objects;


@Entity
@Table(name = "groups_history", schema = "app")
public class GroupsHistory {
    @Id
    @Column(name = "history_id", unique = true, nullable = false, length = 40)
    private String historyId;

    @Column(name = "added_at")
    private Timestamp addedAt;

    @Column(name = "added_by", length = 255)
    private String addedBy;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(length = 3000, nullable = false)
    private String description;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "updated_by", length = 255)
    private String updatedBy;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id", nullable = true, insertable = false, updatable = false)
    @JsonBackReference(value = "groupsHistoriesGroupRef")
    private Group group;

    @Column(name = "operation", length = 255)
    private String operation;

    @Column(name = "group_id", length = 40)
    private String groupId;

    public GroupsHistory() {
    }

    public String getHistoryId() {
        return this.historyId;
    }

    public void setHistoryId(String historyId) {
        this.historyId = historyId;
    }

    public Timestamp getAddedAt() {
        return this.addedAt;
    }

    public void setAddedAt(Timestamp addedAt) {
        this.addedAt = addedAt;
    }

    public String getAddedBy() {
        return this.addedBy;
    }

    public void setAddedBy(String addedBy) {
        this.addedBy = addedBy;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Group getGroup() {
        return this.group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
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
        GroupsHistory that = (GroupsHistory) o;
        return Objects.equals(historyId, that.historyId) && Objects.equals(addedAt, that.addedAt) && Objects.equals(addedBy, that.addedBy) && Objects.equals(name, that.name) && Objects.equals(description, that.description) && Objects.equals(updatedAt, that.updatedAt) && Objects.equals(updatedBy, that.updatedBy) && Objects.equals(group, that.group) && Objects.equals(operation, that.operation) && Objects.equals(groupId, that.groupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(historyId, addedAt, addedBy, name, description, updatedAt, updatedBy, group, operation, groupId);
    }

    @Override
    public String toString() {
        return "GroupsHistory{" + "historyId='" + historyId + '\'' + ", addedAt=" + addedAt + ", addedBy='" + addedBy + '\'' + ", name='" + name + '\'' + ", description='" + description + '\'' + ", updatedAt=" + updatedAt + ", updatedBy='" + updatedBy + '\'' + ", group=" + group + ", operation='" + operation + '\'' + ", groupId='" + groupId + '\'' + '}';
    }
}