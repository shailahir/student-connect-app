package org.aravalieducation.stucon.service.impl;

import org.aravalieducation.stucon.entity.Message;
import org.aravalieducation.stucon.entity.MessageSchedule;
import org.aravalieducation.stucon.repository.MessageScheduleRepository;
import org.aravalieducation.stucon.service.EmailSenderService;
import org.aravalieducation.stucon.service.MessageService;
import org.aravalieducation.stucon.service.SMSSenderService;
import org.aravalieducation.stucon.service.ScheduledTaskService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class ScheduledTaskServiceImpl implements ScheduledTaskService {

    @Autowired
    private MessageScheduleRepository messageScheduleRepository;

    @Autowired
    private SMSSenderService smsSenderService;

    @Autowired
    private EmailSenderService emailSenderService;

    @Override
    public void processMessages() {
        // Take messages from database which are in status new and pending
        List<MessageSchedule> all = messageScheduleRepository.findAllBySchedulerStatusIdInAndScheduledToRunAtBefore(List.of(1,2), Timestamp.from(Instant.now()));

        // Update the status to pending in database
        if(all != null && !all.isEmpty()) {
            for(MessageSchedule messageSchedule: all) {
                messageSchedule.setSchedulerStatusId(2);
            }
            messageScheduleRepository.saveAllAndFlush(all);

            for(MessageSchedule schedule: all) {
                Hibernate.initialize(schedule.getMessage());
                Message message = schedule.getMessage();

                if(message.getMsgTypeId() == 1) {
                    // send sms
                    try {
                        schedule.setSchedulerStatusId(3);
                        messageScheduleRepository.saveAndFlush(schedule);
                        smsSenderService.sendMessage(message, schedule);
                        schedule.setSchedulerStatusId(4);
                        messageScheduleRepository.saveAndFlush(schedule);
                    } catch (Exception e) {
                        schedule.setSchedulerStatusId(5);
                        messageScheduleRepository.saveAndFlush(schedule);
                    }

                } else if(message.getMsgTypeId() == 2) {
                    // send email
                    try {
                        schedule.setSchedulerStatusId(3);
                        messageScheduleRepository.saveAndFlush(schedule);
                        emailSenderService.sendMessage(message, schedule);
                        schedule.setSchedulerStatusId(4);
                        messageScheduleRepository.saveAndFlush(schedule);
                    } catch (Exception e) {
                        schedule.setSchedulerStatusId(5);
                        messageScheduleRepository.saveAndFlush(schedule);
                    }
                }
            }
        }



    }
}
