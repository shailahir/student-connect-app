package org.aravalieducation.stucon.model;

public class StudentGroupNamesResponse {

    public StudentGroupNamesResponse(String groupName, int memberCount) {
        this.groupName = groupName;
        this.memberCount = memberCount;
    }

    public StudentGroupNamesResponse() {
    }

    private String groupName;
    private int memberCount;

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public int getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(int memberCount) {
        this.memberCount = memberCount;
    }
}
