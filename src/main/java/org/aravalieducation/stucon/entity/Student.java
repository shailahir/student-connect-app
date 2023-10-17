package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "students", schema = "app")
public class Student {

    @Id
    @Column(name = "roll_number", unique = true, nullable = false, length = 40)
    private String rollNumber;

    @Column(name = "email_id", nullable = false, length = 255)
    private String emailId;

    @Column(name = "first_name", nullable = false, length = 255)
    private String firstName;

    @Column(name = "last_name", length = 255)
    private String lastName;

    @Column(name = "middle_name", length = 255)
    private String middleName;

    @Column(name = "mobile_number", nullable = false, length = 20)
    private String mobileNumber;

    @Column(name = "parent_mobile_number", length = 20)
    private String parentMobileNumber;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "groupMembershipsStudentRef")
    private Set<GroupMembership> groupMemberships;

    @OneToMany(mappedBy = "student")
    private Set<MessageReceiver> messageReceivers;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
    @JsonManagedReference(value = "studentHistoriesStudentRef")
    private Set<StudentsHistory> studentHistories;

    public Student() {
    }

    public String getRollNumber() {
        return this.rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getEmailId() {
        return this.emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return this.middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getMobileNumber() {
        return this.mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getParentMobileNumber() {
        return this.parentMobileNumber;
    }

    public void setParentMobileNumber(String parentMobileNumber) {
        this.parentMobileNumber = parentMobileNumber;
    }

    public Set<GroupMembership> getGroupMemberships() {
        if (this.groupMemberships == null) {
            this.groupMemberships = new HashSet<>();
        }
        return this.groupMemberships;
    }

    public void setGroupMemberships(Set<GroupMembership> groupMemberships) {
        this.groupMemberships = groupMemberships;
    }

    public GroupMembership addGroupMembership(GroupMembership groupMembership) {
        getGroupMemberships().add(groupMembership);
        groupMembership.setStudent(this);

        return groupMembership;
    }

    public GroupMembership removeGroupMembership(GroupMembership groupMembership) {
        getGroupMemberships().remove(groupMembership);
        groupMembership.setStudent(null);

        return groupMembership;
    }

    public Set<MessageReceiver> getMessageReceivers() {
        if (this.messageReceivers == null) {
            this.messageReceivers = new HashSet<>();
        }
        return this.messageReceivers;
    }

    public void setMessageReceivers(Set<MessageReceiver> messageReceivers) {
        this.messageReceivers = messageReceivers;
    }

    public MessageReceiver addMessageReceiver(MessageReceiver messageReceiver) {
        getMessageReceivers().add(messageReceiver);
        messageReceiver.setStudent(this);

        return messageReceiver;
    }

    public MessageReceiver removeMessageReceiver(MessageReceiver messageReceiver) {
        getMessageReceivers().remove(messageReceiver);
        messageReceiver.setStudent(null);

        return messageReceiver;
    }

    public Set<StudentsHistory> getStudentHistories() {
        if (this.studentHistories == null) {
            this.studentHistories = new HashSet<>();
        }
        return this.studentHistories;
    }

    public void setStudentHistories(Set<StudentsHistory> studentHistories) {
        this.studentHistories = studentHistories;
    }

    public StudentsHistory addStudentHistory(StudentsHistory studentHistory) {
        getStudentHistories().add(studentHistory);
//        if (studentHistory.getStudent() != this) {
//            studentHistory.setStudent(this);
//        }
        return studentHistory;
    }

    public StudentsHistory removeStudentHistory(StudentsHistory studentHistory) {
        getStudentHistories().remove(studentHistory);
        studentHistory.setStudent(null);
        return studentHistory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(rollNumber, student.rollNumber) && Objects.equals(emailId, student.emailId) && Objects.equals(firstName, student.firstName) && Objects.equals(lastName, student.lastName) && Objects.equals(middleName, student.middleName) && Objects.equals(mobileNumber, student.mobileNumber) && Objects.equals(parentMobileNumber, student.parentMobileNumber) && Objects.equals(groupMemberships, student.groupMemberships) && Objects.equals(messageReceivers, student.messageReceivers) && Objects.equals(studentHistories, student.studentHistories);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rollNumber, emailId, firstName, lastName, middleName, mobileNumber, parentMobileNumber, groupMemberships, messageReceivers, studentHistories);
    }

    @Override
    public String toString() {
        return "Student{" +
                "rollNumber='" + rollNumber + '\'' +
                ", emailId='" + emailId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", parentMobileNumber='" + parentMobileNumber + '\'' +
                ", groupMemberships=" + groupMemberships +
                ", messageReceivers=" + messageReceivers +
                ", studentHistories=" + studentHistories +
                '}';
    }
}