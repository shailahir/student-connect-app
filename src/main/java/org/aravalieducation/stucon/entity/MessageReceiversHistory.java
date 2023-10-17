package org.aravalieducation.stucon.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;


@Entity
@Table(name = "message_receivers_history", schema = "app")
@NamedQuery(name = "MessageReceiversHistory.findAll", query = "SELECT m FROM MessageReceiversHistory m")
public class MessageReceiversHistory implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "history_id", unique = true, nullable = false, length = 40)
    private String historyId;

    @Column(name = "added_at")
    private Timestamp addedAt;

    @Column(name = "added_by", length = 255)
    private String addedBy;

    @Column(name = "message_id", nullable = false, length = 40)
    private String messageId;

    @Column(name = "student_id", nullable = false, length = 40)
    private String studentId;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "updated_by", length = 255)
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private MessageReceiver messageReceiver;

    public MessageReceiversHistory() {
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

    public String getMessageId() {
        return this.messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public String getStudentId() {
        return this.studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
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

    public MessageReceiver getMessageReceiver() {
        return this.messageReceiver;
    }

    public void setMessageReceiver(MessageReceiver messageReceiver) {
        this.messageReceiver = messageReceiver;
    }

}