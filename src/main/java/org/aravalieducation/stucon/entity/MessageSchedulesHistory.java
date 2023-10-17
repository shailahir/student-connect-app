package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;


@Entity
@Table(name = "message_schedules_history", schema = "app")
@NamedQuery(name = "MessageSchedulesHistory.findAll", query = "SELECT m FROM MessageSchedulesHistory m")
public class MessageSchedulesHistory implements Serializable {
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

    @Column(name = "scheduled_to_run_at", nullable = false)
    private Timestamp scheduledToRunAt;

    @Column(name = "scheduler_status_id")
    private Integer schedulerStatusId;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "updated_by", length = 255)
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    @JsonBackReference("messageSchedulesHistoriesRef")
    private MessageSchedule messageSchedule;

    public MessageSchedulesHistory() {
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

    public Timestamp getScheduledToRunAt() {
        return this.scheduledToRunAt;
    }

    public void setScheduledToRunAt(Timestamp scheduledToRunAt) {
        this.scheduledToRunAt = scheduledToRunAt;
    }

    public Integer getSchedulerStatusId() {
        return this.schedulerStatusId;
    }

    public void setSchedulerStatusId(Integer schedulerStatusId) {
        this.schedulerStatusId = schedulerStatusId;
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

    public MessageSchedule getMessageSchedule() {
        return this.messageSchedule;
    }

    public void setMessageSchedule(MessageSchedule messageSchedule) {
        this.messageSchedule = messageSchedule;
    }

}