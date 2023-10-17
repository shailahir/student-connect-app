package org.aravalieducation.stucon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "messages", schema = "app")
public class Message {

    @Id
    @Column(unique = true, nullable = false, length = 40)
    private String id;

    @Column(name = "msg_text", nullable = false, length = 2147483647)
    private String msgText;

    @Column(name = "msg_subject", nullable = false, length = 255)
    private String msgSubject;

    @Column(name = "msg_type_id", nullable = false)
    private Integer msgTypeId;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference("messageDeliveriesRef")
    private List<MessageDelivery> messageDeliveries;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference("messageReceiversRef")
    private List<MessageReceiver> messageReceivers;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference("messageSchedulesRef")
    private List<MessageSchedule> messageSchedules;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference("messagesHistoriesMRef")
    private List<MessagesHistory> messagesHistories;

    public Message() {
    }

    public String getMsgSubject() {
        return msgSubject;
    }

    public void setMsgSubject(String msgSubject) {
        this.msgSubject = msgSubject;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
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

    public List<MessageDelivery> getMessageDeliveries() {
        return this.messageDeliveries;
    }

    public void setMessageDeliveries(List<MessageDelivery> messageDeliveries) {
        this.messageDeliveries = messageDeliveries;
    }

    public MessageDelivery addMessageDelivery(MessageDelivery messageDelivery) {
        getMessageDeliveries().add(messageDelivery);
        messageDelivery.setMessage(this);

        return messageDelivery;
    }

    public MessageDelivery removeMessageDelivery(MessageDelivery messageDelivery) {
        getMessageDeliveries().remove(messageDelivery);
        messageDelivery.setMessage(null);

        return messageDelivery;
    }

    public List<MessageReceiver> getMessageReceivers() {
        return this.messageReceivers;
    }

    public void setMessageReceivers(List<MessageReceiver> messageReceivers) {
        this.messageReceivers = messageReceivers;
    }

    public MessageReceiver addMessageReceiver(MessageReceiver messageReceiver) {
        getMessageReceivers().add(messageReceiver);
        messageReceiver.setMessage(this);

        return messageReceiver;
    }

    public MessageReceiver removeMessageReceiver(MessageReceiver messageReceiver) {
        getMessageReceivers().remove(messageReceiver);
        messageReceiver.setMessage(null);

        return messageReceiver;
    }

    public List<MessageSchedule> getMessageSchedules() {
        if (this.messageSchedules == null) {
            return new ArrayList<>();
        }
        return this.messageSchedules;
    }

    public void setMessageSchedules(List<MessageSchedule> messageSchedules) {
        this.messageSchedules = messageSchedules;
    }

    public MessageSchedule addMessageSchedule(MessageSchedule messageSchedule) {
        getMessageSchedules().add(messageSchedule);
        messageSchedule.setMessage(this);

        return messageSchedule;
    }

    public MessageSchedule removeMessageSchedule(MessageSchedule messageSchedule) {
        getMessageSchedules().remove(messageSchedule);
        messageSchedule.setMessage(null);

        return messageSchedule;
    }

    public List<MessagesHistory> getMessagesHistories() {
        return this.messagesHistories;
    }

    public void setMessagesHistories(List<MessagesHistory> messagesHistories) {
        this.messagesHistories = messagesHistories;
    }

    public MessagesHistory addMessagesHistory(MessagesHistory messagesHistory) {
        getMessagesHistories().add(messagesHistory);
        messagesHistory.setMessage(this);

        return messagesHistory;
    }

    public MessagesHistory removeMessagesHistory(MessagesHistory messagesHistory) {
        getMessagesHistories().remove(messagesHistory);
        messagesHistory.setMessage(null);

        return messagesHistory;
    }

    @JsonIgnore
    @Override
    public String toString() {
        return "Message{" +
                "id='" + id + '\'' +
                ", msgText='" + msgText + '\'' +
                ", msgTypeId=" + msgTypeId +
                ", messageDeliveries=" + messageDeliveries +
                ", messageReceivers=" + messageReceivers +
                ", messageSchedules=" + messageSchedules +
                ", messagesHistories=" + messagesHistories +
                '}';
    }
}