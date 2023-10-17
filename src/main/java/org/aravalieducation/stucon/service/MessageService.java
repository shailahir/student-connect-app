package org.aravalieducation.stucon.service;

import org.aravalieducation.stucon.entity.Message;
import org.aravalieducation.stucon.entity.MessageSchedule;
import org.aravalieducation.stucon.model.MessageRequest;

import java.util.List;

public interface MessageService {
    Message saveMessage(MessageRequest messageRequest);

    List<Message> getAllMessages();

    Message getMessageById(String id);

    List<MessageSchedule> getAllMessageSchedules();

    MessageSchedule getMessageScheduleById(String id);

    Message getMessageByScheduleId(String id);
}
