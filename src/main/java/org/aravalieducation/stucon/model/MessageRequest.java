package org.aravalieducation.stucon.model;

import java.sql.Timestamp;
import java.util.List;

public class MessageRequest {
    private Integer messageTypeId = 2;
    private String messageText;
    private String messageSubject;
    private Timestamp timestamp;
    private boolean runASAP;
    private List<MessageReceiverPart> receivers;

    public Integer getMessageTypeId() {
        return messageTypeId;
    }

    public void setMessageTypeId(Integer messageTypeId) {
        this.messageTypeId = messageTypeId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public String getMessageSubject() {
        return messageSubject;
    }

    public void setMessageSubject(String messageSubject) {
        this.messageSubject = messageSubject;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isRunASAP() {
        return runASAP;
    }

    public void setRunASAP(boolean runASAP) {
        this.runASAP = runASAP;
    }

    public List<MessageReceiverPart> getReceivers() {
        return receivers;
    }

    public void setReceivers(List<MessageReceiverPart> receivers) {
        this.receivers = receivers;
    }
}
