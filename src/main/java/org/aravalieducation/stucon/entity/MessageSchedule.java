package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;


@Entity
@Table(name = "message_schedules", schema = "app")
public class MessageSchedule implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(unique = true, nullable = false, length = 40)
    private String id;

    @Column(name = "scheduled_to_run_at", nullable = false)
    private Timestamp scheduledToRunAt;

    @Column(name = "scheduler_status_id")
    private Integer schedulerStatusId;

    @OneToMany(mappedBy = "messageSchedule", cascade = CascadeType.ALL)
    private List<MessageDelivery> messageDeliveries;

    @ManyToOne
    @JoinColumn(name = "message_id", nullable = false)
    @JsonBackReference("messageSchedulesRef")
    private Message message;

    @OneToMany(mappedBy = "messageSchedule")
    @JsonManagedReference("messageSchedulesHistoriesRef")
    private List<MessageSchedulesHistory> messageSchedulesHistories;

    public MessageSchedule() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
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

    public List<MessageDelivery> getMessageDeliveries() {
        return this.messageDeliveries;
    }

    public void setMessageDeliveries(List<MessageDelivery> messageDeliveries) {
        this.messageDeliveries = messageDeliveries;
    }

    public MessageDelivery addMessageDelivery(MessageDelivery messageDelivery) {
        getMessageDeliveries().add(messageDelivery);
        messageDelivery.setMessageSchedule(this);

        return messageDelivery;
    }

    public MessageDelivery removeMessageDelivery(MessageDelivery messageDelivery) {
        getMessageDeliveries().remove(messageDelivery);
        messageDelivery.setMessageSchedule(null);

        return messageDelivery;
    }

    public Message getMessage() {
        return this.message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public List<MessageSchedulesHistory> getMessageSchedulesHistories() {
        return this.messageSchedulesHistories;
    }

    public void setMessageSchedulesHistories(List<MessageSchedulesHistory> messageSchedulesHistories) {
        this.messageSchedulesHistories = messageSchedulesHistories;
    }

    public MessageSchedulesHistory addMessageSchedulesHistory(MessageSchedulesHistory messageSchedulesHistory) {
        getMessageSchedulesHistories().add(messageSchedulesHistory);
        messageSchedulesHistory.setMessageSchedule(this);

        return messageSchedulesHistory;
    }

    public MessageSchedulesHistory removeMessageSchedulesHistory(MessageSchedulesHistory messageSchedulesHistory) {
        getMessageSchedulesHistories().remove(messageSchedulesHistory);
        messageSchedulesHistory.setMessageSchedule(null);

        return messageSchedulesHistory;
    }

}