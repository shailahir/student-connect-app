package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;


@Entity
@Table(name = "group_memberships", schema = "app")
public class GroupMembership {

    @Id
    @Column(unique = true, nullable = false, length = 40)
    private String id;

    @Column(name = "added_on", nullable = false)
    private Timestamp addedOn;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    @JsonBackReference("groupMembershipsGroupRef")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonBackReference("groupMembershipsStudentRef")
    private Student student;

    @OneToMany(mappedBy = "groupMembership", cascade = CascadeType.ALL)
    private List<GroupMembershipsHistory> groupMembershipsHistories;

    public GroupMembership() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Timestamp getAddedOn() {
        return this.addedOn;
    }

    public void setAddedOn(Timestamp addedOn) {
        this.addedOn = addedOn;
    }

    public Group getGroup() {
        return this.group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public List<GroupMembershipsHistory> getGroupMembershipsHistories() {
        return this.groupMembershipsHistories;
    }

    public void setGroupMembershipsHistories(List<GroupMembershipsHistory> groupMembershipsHistories) {
        this.groupMembershipsHistories = groupMembershipsHistories;
    }

    public GroupMembershipsHistory addGroupMembershipsHistory(GroupMembershipsHistory groupMembershipsHistory) {
        getGroupMembershipsHistories().add(groupMembershipsHistory);
        groupMembershipsHistory.setGroupMembership(this);

        return groupMembershipsHistory;
    }

    public GroupMembershipsHistory removeGroupMembershipsHistory(GroupMembershipsHistory groupMembershipsHistory) {
        getGroupMembershipsHistories().remove(groupMembershipsHistory);
        groupMembershipsHistory.setGroupMembership(null);

        return groupMembershipsHistory;
    }

}