package org.aravalieducation.stucon.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "message_deliveries_history", schema = "app")
@NamedQuery(name = "MessageDeliveriesHistory.findAll", query = "SELECT m FROM MessageDeliveriesHistory m")
public class MessageDeliveriesHistory implements Serializable {
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

    @Column(name = "receiver_id", nullable = false, length = 40)
    private String receiverId;

    @Column(length = 2147483647)
    private String remarks;

    @Column(name = "schedule_id", nullable = false, length = 40)
    private String scheduleId;

    @Column(name = "status_id", nullable = false)
    private Integer statusId;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "updated_by", length = 255)
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private MessageDelivery messageDelivery;

    public MessageDeliveriesHistory() {
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

    public String getReceiverId() {
        return this.receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getRemarks() {
        return this.remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getScheduleId() {
        return this.scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Integer getStatusId() {
        return this.statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
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

    public MessageDelivery getMessageDelivery() {
        return this.messageDelivery;
    }

    public void setMessageDelivery(MessageDelivery messageDelivery) {
        this.messageDelivery = messageDelivery;
    }

}