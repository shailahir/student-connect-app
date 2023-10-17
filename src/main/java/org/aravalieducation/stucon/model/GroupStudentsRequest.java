package org.aravalieducation.stucon.model;

import java.util.List;

public class GroupStudentsRequest {
    private String groupId;
    private List<IdObj> students;

    public GroupStudentsRequest(String groupId, List<IdObj> students) {
        this.groupId = groupId;
        this.students = students;
    }

    public GroupStudentsRequest() {
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public List<IdObj> getStudents() {
        return students;
    }

    public void setStudents(List<IdObj> students) {
        this.students = students;
    }


}
