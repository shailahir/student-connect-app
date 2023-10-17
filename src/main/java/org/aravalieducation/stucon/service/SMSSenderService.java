package org.aravalieducation.stucon.service;

import org.aravalieducation.stucon.entity.Message;
import org.aravalieducation.stucon.entity.MessageSchedule;

public interface SMSSenderService {
    void sendMessage(Message message, MessageSchedule schedule);
}
