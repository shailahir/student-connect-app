package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "students_history", schema = "app")
public class StudentsHistory {
    @Id
    @Column(name = "history_id", unique = true, nullable = false, length = 40)
    private String historyId;

    @Column(name = "added_at")
    private Timestamp addedAt;

    @Column(name = "added_by", length = 255)
    private String addedBy;

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

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "updated_by", length = 255)
    private String updatedBy;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roll_number", nullable = true, insertable = false, updatable = false)
    @JsonBackReference(value = "studentHistoriesStudentRef")
    private Student student;

    @Column(name = "st_roll_number", length = 255)
    private String stRollNumber;

    @Column(name = "operation", length = 255)
    private String operation;

    public StudentsHistory() {
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

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        if (student == null) {
            this.student = null;
            return;
        }
        if (this.student != null && this.student.equals(student)) {
            return;
        }
        /*if(student.getStudentHistories() != null && !student.getStudentHistories().contains(this)) {
            student.addStudentHistory(this);
        }*/
        this.student = student;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getStRollNumber() {
        return stRollNumber;
    }

    public void setStRollNumber(String stRollNumber) {
        this.stRollNumber = stRollNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StudentsHistory history = (StudentsHistory) o;
        return Objects.equals(historyId, history.historyId) && Objects.equals(addedAt, history.addedAt) && Objects.equals(addedBy, history.addedBy) && Objects.equals(emailId, history.emailId) && Objects.equals(firstName, history.firstName) && Objects.equals(lastName, history.lastName) && Objects.equals(middleName, history.middleName) && Objects.equals(mobileNumber, history.mobileNumber) && Objects.equals(parentMobileNumber, history.parentMobileNumber) && Objects.equals(updatedAt, history.updatedAt) && Objects.equals(updatedBy, history.updatedBy) && Objects.equals(student, history.student) && Objects.equals(stRollNumber, history.stRollNumber) && Objects.equals(operation, history.operation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(historyId, addedAt, addedBy, emailId, firstName, lastName, middleName, mobileNumber, parentMobileNumber, updatedAt, updatedBy, student, stRollNumber, operation);
    }

    @Override
    public String toString() {
        return "StudentsHistory{" +
                "historyId='" + historyId + '\'' +
                ", addedAt=" + addedAt +
                ", addedBy='" + addedBy + '\'' +
                ", emailId='" + emailId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", parentMobileNumber='" + parentMobileNumber + '\'' +
                ", updatedAt=" + updatedAt +
                ", updatedBy='" + updatedBy + '\'' +
                ", student=" + student +
                ", stRollNumber='" + stRollNumber + '\'' +
                ", operation='" + operation + '\'' +
                '}';
    }
}