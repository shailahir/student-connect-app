package org.aravalieducation.stucon.service.impl;

import jakarta.transaction.Transactional;
import org.aravalieducation.stucon.entity.Message;
import org.aravalieducation.stucon.entity.MessageReceiver;
import org.aravalieducation.stucon.entity.MessageSchedule;
import org.aravalieducation.stucon.entity.Student;
import org.aravalieducation.stucon.model.MessageReceiverPart;
import org.aravalieducation.stucon.model.MessageRequest;
import org.aravalieducation.stucon.repository.MessageReceiverRepository;
import org.aravalieducation.stucon.repository.MessageRepository;
import org.aravalieducation.stucon.repository.MessageScheduleRepository;
import org.aravalieducation.stucon.repository.StudentRepository;
import org.aravalieducation.stucon.service.MessageService;
import org.aravalieducation.stucon.service.StudentGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;

@Service
public class MessageServiceImpl implements MessageService {


    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private StudentGroupService studentGroupService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MessageScheduleRepository messageScheduleRepository;

    @Autowired
    private MessageReceiverRepository messageReceiverRepository;

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Message saveMessage(MessageRequest messageRequest) {
        Message message = new Message();
        message.setId(UUID.randomUUID().toString());

        message.setMsgTypeId(messageRequest.getMessageTypeId());
        message.setMsgText(messageRequest.getMessageText());
        message.setMsgSubject(messageRequest.getMessageSubject());

        MessageSchedule messageSchedule = new MessageSchedule();
        messageSchedule.setId(UUID.randomUUID().toString());
        messageSchedule.setMessage(message);
        messageSchedule.setSchedulerStatusId(1);


        if (messageRequest.isRunASAP()) {
            messageSchedule.setScheduledToRunAt(Timestamp.from(Instant.now()));
        } else {
            messageSchedule.setScheduledToRunAt(messageRequest.getTimestamp());
        }
        message.setMessageSchedules(List.of(messageSchedule));


        List<MessageReceiverPart> receiverList = messageRequest.getReceivers();
        Set<Student> studentSet = new HashSet<>();
        if (receiverList != null && !receiverList.isEmpty()) {
            for (MessageReceiverPart receiver : receiverList) {
                if (receiver != null && StringUtils.hasLength(receiver.getRollNumber())) {
                    Optional<Student> student = studentRepository.findById(receiver.getRollNumber());
                    if (student.isPresent()) {
                        studentSet.add(student.get());
                    }
                } else if (receiver != null && StringUtils.hasLength(receiver.getGroupId())) {
                    // Get members of the groups
                    List<Student> students = studentGroupService.getAllStudentsInGroup(receiver.getGroupId());
                    if (students != null && !students.isEmpty()) {
                        studentSet.addAll(students);
                        System.out.println(students);
                    }
                }
            }
        }
        List<MessageReceiver> messageReceiverList = new ArrayList<>();
        if (!studentSet.isEmpty()) {
            List<Student> listFromSet = studentSet.stream().toList();
            if (!listFromSet.isEmpty()) {
                for (Student student : listFromSet) {
                    MessageReceiver messageReceiver = new MessageReceiver();
                    messageReceiver.setId(UUID.randomUUID().toString());
                    messageReceiver.setMessage(message);
                    messageReceiver.setStudent(student);

                    messageReceiverList.add(messageReceiver);
                }
            }
            message.setMessageReceivers(messageReceiverList);

        }


        Message result = messageRepository.save(message);
        if (messageReceiverList != null && !messageReceiverList.isEmpty()) {
            messageReceiverRepository.saveAll(messageReceiverList);
        }

        messageScheduleRepository.save(messageSchedule);

//        Hibernate.initialize(result.getMessageReceivers());
        return result;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Message getMessageById(String id) {
        Optional<Message> message = messageRepository.findById(id);
        return message.get();
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<MessageSchedule> getAllMessageSchedules() {
        return messageScheduleRepository.findAll();
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public MessageSchedule getMessageScheduleById(String id) {
        return messageScheduleRepository.findById(id).get();
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Message getMessageByScheduleId(String id) {
        return messageRepository.findByMessageSchedulesId(id);
    }
}
