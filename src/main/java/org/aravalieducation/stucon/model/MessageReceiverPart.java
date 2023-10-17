package org.aravalieducation.stucon.model;

public class MessageReceiverPart {
    private String rollNumber;
    private String fullName;
    private String groupId;
    private String groupName;

    public MessageReceiverPart() {
    }

    public MessageReceiverPart(String rollNumber, String fullName, String groupId, String groupName) {
        this.rollNumber = rollNumber;
        this.fullName = fullName;
        this.groupId = groupId;
        this.groupName = groupName;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
