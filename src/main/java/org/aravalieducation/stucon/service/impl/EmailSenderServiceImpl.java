package org.aravalieducation.stucon.service.impl;

import org.aravalieducation.stucon.entity.Message;
import org.aravalieducation.stucon.entity.MessageDelivery;
import org.aravalieducation.stucon.entity.MessageReceiver;
import org.aravalieducation.stucon.entity.MessageSchedule;
import org.aravalieducation.stucon.repository.MessageDeliveryRepository;
import org.aravalieducation.stucon.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private MessageDeliveryRepository messageDeliveryRepository;

    @Override
    public void sendMessage(Message message, MessageSchedule schedule) {
        System.out.println("Send Email");

        List<MessageReceiver> receiverList = message.getMessageReceivers();
        if (receiverList != null && !receiverList.isEmpty()) {
            for (MessageReceiver messageReceiver : receiverList) {
                System.out.println(messageReceiver.getStudent().getEmailId());
                String emailId = messageReceiver.getStudent().getEmailId();

                try {
                    SimpleMailMessage mailMessage = new SimpleMailMessage();
                    mailMessage.setFrom("notification@shailahir.com");
                    mailMessage.setTo(emailId);
                    mailMessage.setSubject(message.getMsgSubject());
                    mailMessage.setText(message.getMsgText());
                    javaMailSender.send(mailMessage);

                    MessageDelivery messageDelivery = new MessageDelivery();
                    messageDelivery.setMessage(message);
                    messageDelivery.setMessageReceiver(messageReceiver);
                    messageDelivery.setId(UUID.randomUUID().toString());
                    messageDelivery.setStatusId(4);
                    messageDelivery.setMessageSchedule(schedule);
                    messageDelivery.setRemarks("Successfully sent email");

                    messageDeliveryRepository.save(messageDelivery);
                } catch (Exception e) {
                    e.printStackTrace();
                    MessageDelivery messageDelivery = new MessageDelivery();
                    messageDelivery.setMessage(message);
                    messageDelivery.setMessageReceiver(messageReceiver);
                    messageDelivery.setId(UUID.randomUUID().toString());
                    messageDelivery.setStatusId(5);
                    messageDelivery.setMessageSchedule(schedule);
                    messageDelivery.setRemarks("Error occurred while sending email: " + e.getMessage());

                    messageDeliveryRepository.save(messageDelivery);
                }


                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }


}
