package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;


@Entity
@Table(name = "messages_history", schema = "app")
@NamedQuery(name = "MessagesHistory.findAll", query = "SELECT m FROM MessagesHistory m")
public class MessagesHistory implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "history_id", unique = true, nullable = false, length = 40)
    private String historyId;

    @Column(name = "added_at")
    private Timestamp addedAt;

    @Column(name = "added_by", length = 255)
    private String addedBy;

    @Column(name = "msg_text", nullable = false, length = 2147483647)
    private String msgText;

    @Column(name = "msg_type_id", nullable = false)
    private Integer msgTypeId;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "updated_by", length = 255)
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    @JsonBackReference("messagesHistoriesMRef")
    private Message message;

    public MessagesHistory() {
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

    public String getMsgText() {
        return this.msgText;
    }

    public void setMsgText(String msgText) {
        this.msgText = msgText;
    }

    public Integer getMsgTypeId() {
        return this.msgTypeId;
    }

    public void setMsgTypeId(Integer msgTypeId) {
        this.msgTypeId = msgTypeId;
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

    public Message getMessage() {
        return this.message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

}