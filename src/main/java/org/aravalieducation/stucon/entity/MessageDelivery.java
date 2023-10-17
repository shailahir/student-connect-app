package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "message_deliveries", schema = "app")
@NamedQuery(name = "MessageDelivery.findAll", query = "SELECT m FROM MessageDelivery m")
public class MessageDelivery implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(unique = true, nullable = false, length = 40)
    private String id;

    @Column(length = 2147483647)
    private String remarks;

    @Column(name = "status_id", nullable = false)
    private Integer statusId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "receiver_id", nullable = false)
    private MessageReceiver messageReceiver;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "schedule_id", nullable = false)
    private MessageSchedule messageSchedule;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id", nullable = false)
    @JsonBackReference("messageDeliveriesRef")
    private Message message;

    @OneToMany(mappedBy = "messageDelivery", cascade = CascadeType.ALL)
    private List<MessageDeliveriesHistory> messageDeliveriesHistories;

    public MessageDelivery() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRemarks() {
        return this.remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Integer getStatusId() {
        return this.statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }

    public MessageReceiver getMessageReceiver() {
        return this.messageReceiver;
    }

    public void setMessageReceiver(MessageReceiver messageReceiver) {
        this.messageReceiver = messageReceiver;
    }

    public MessageSchedule getMessageSchedule() {
        return this.messageSchedule;
    }

    public void setMessageSchedule(MessageSchedule messageSchedule) {
        this.messageSchedule = messageSchedule;
    }

    public Message getMessage() {
        return this.message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public List<MessageDeliveriesHistory> getMessageDeliveriesHistories() {
        return this.messageDeliveriesHistories;
    }

    public void setMessageDeliveriesHistories(List<MessageDeliveriesHistory> messageDeliveriesHistories) {
        this.messageDeliveriesHistories = messageDeliveriesHistories;
    }

    public MessageDeliveriesHistory addMessageDeliveriesHistory(MessageDeliveriesHistory messageDeliveriesHistory) {
        getMessageDeliveriesHistories().add(messageDeliveriesHistory);
        messageDeliveriesHistory.setMessageDelivery(this);

        return messageDeliveriesHistory;
    }

    public MessageDeliveriesHistory removeMessageDeliveriesHistory(MessageDeliveriesHistory messageDeliveriesHistory) {
        getMessageDeliveriesHistories().remove(messageDeliveriesHistory);
        messageDeliveriesHistory.setMessageDelivery(null);

        return messageDeliveriesHistory;
    }

}