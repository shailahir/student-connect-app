package org.aravalieducation.stucon.model;

import java.util.List;

public class StudentGroupsRequest {
    private String rollNumber;
    private List<IdObj> groups;

    public StudentGroupsRequest() {
    }

    public StudentGroupsRequest(String rollNumber, List<IdObj> groups) {
        this.rollNumber = rollNumber;
        this.groups = groups;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public List<IdObj> getGroups() {
        return groups;
    }

    public void setGroups(List<IdObj> groups) {
        this.groups = groups;
    }


}
