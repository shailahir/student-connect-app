package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "message_receivers", schema = "app")
public class MessageReceiver {

    @Id
    @Column(unique = true, nullable = false, length = 40)
    private String id;

    @OneToMany(mappedBy = "messageReceiver", cascade = CascadeType.ALL)
    private List<MessageDelivery> messageDeliveries;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id", nullable = false)
    @JsonBackReference("messageReceiversRef")
    private Message message;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @OneToMany(mappedBy = "messageReceiver", cascade = CascadeType.ALL)
    private List<MessageReceiversHistory> messageReceiversHistories;

    public MessageReceiver() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<MessageDelivery> getMessageDeliveries() {
        return this.messageDeliveries;
    }

    public void setMessageDeliveries(List<MessageDelivery> messageDeliveries) {
        this.messageDeliveries = messageDeliveries;
    }

    public MessageDelivery addMessageDelivery(MessageDelivery messageDelivery) {
        getMessageDeliveries().add(messageDelivery);
        messageDelivery.setMessageReceiver(this);

        return messageDelivery;
    }

    public MessageDelivery removeMessageDelivery(MessageDelivery messageDelivery) {
        getMessageDeliveries().remove(messageDelivery);
        messageDelivery.setMessageReceiver(null);

        return messageDelivery;
    }

    public Message getMessage() {
        return this.message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public List<MessageReceiversHistory> getMessageReceiversHistories() {
        return this.messageReceiversHistories;
    }

    public void setMessageReceiversHistories(List<MessageReceiversHistory> messageReceiversHistories) {
        this.messageReceiversHistories = messageReceiversHistories;
    }

    public MessageReceiversHistory addMessageReceiversHistory(MessageReceiversHistory messageReceiversHistory) {
        getMessageReceiversHistories().add(messageReceiversHistory);
        messageReceiversHistory.setMessageReceiver(this);

        return messageReceiversHistory;
    }

    public MessageReceiversHistory removeMessageReceiversHistory(MessageReceiversHistory messageReceiversHistory) {
        getMessageReceiversHistories().remove(messageReceiversHistory);
        messageReceiversHistory.setMessageReceiver(null);

        return messageReceiversHistory;
    }

}