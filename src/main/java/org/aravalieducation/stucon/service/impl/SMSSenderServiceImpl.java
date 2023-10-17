package org.aravalieducation.stucon.service.impl;

import com.twilio.Twilio;
import org.aravalieducation.stucon.entity.Message;
import org.aravalieducation.stucon.entity.MessageDelivery;
import org.aravalieducation.stucon.entity.MessageReceiver;
import org.aravalieducation.stucon.entity.MessageSchedule;
import org.aravalieducation.stucon.repository.MessageDeliveryRepository;
import org.aravalieducation.stucon.service.SMSSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

@Service
public class SMSSenderServiceImpl implements SMSSenderService {

    @Value("${sms.account.id}")
    private String accountSID;

    @Value("${sms.auth.token}")
    private String authToken;

    @Value("${sms.from.number}")
    private String fromNumber;

    @Autowired
    private MessageDeliveryRepository messageDeliveryRepository;

    @Override
    public void sendMessage(Message message, MessageSchedule schedule) {
        Twilio.init(accountSID, authToken);

        List<MessageReceiver> receiverList = message.getMessageReceivers();
        if (receiverList != null && !receiverList.isEmpty()) {

            for (MessageReceiver messageReceiver : receiverList) {
                System.out.println(messageReceiver.getStudent().getMobileNumber());
                String mobileNumber = messageReceiver.getStudent().getMobileNumber();
                if (StringUtils.hasLength(mobileNumber)) {
                    String trimmedMobileNumber = "+91"+ StringUtils.trimAllWhitespace(mobileNumber);
                    System.out.println("trimmedMobileNumber = "+trimmedMobileNumber);
                    try {
                        com.twilio.rest.api.v2010.account.Message sms = com.twilio.rest.api.v2010.account.Message.creator(
                                new com.twilio.type.PhoneNumber(trimmedMobileNumber),
                                new com.twilio.type.PhoneNumber(fromNumber),
                                message.getMsgText()
                        ).create();

                        MessageDelivery messageDelivery = new MessageDelivery();
                        messageDelivery.setMessage(message);
                        messageDelivery.setMessageReceiver(messageReceiver);
                        messageDelivery.setId(UUID.randomUUID().toString());
                        messageDelivery.setStatusId(4);
                        messageDelivery.setMessageSchedule(schedule);
                        messageDelivery.setRemarks("Successfully sent sms to the number, sid = " + sms.getSid());
                        System.out.println(sms.getSid());
                        messageDeliveryRepository.save(messageDelivery);
                    } catch (Exception e) {
                        e.printStackTrace();
                        MessageDelivery messageDelivery = new MessageDelivery();
                        messageDelivery.setMessage(message);
                        messageDelivery.setMessageReceiver(messageReceiver);
                        messageDelivery.setId(UUID.randomUUID().toString());
                        messageDelivery.setStatusId(5);
                        messageDelivery.setMessageSchedule(schedule);
                        messageDelivery.setRemarks("Error occurred while sending SMS: " + e.getMessage());
                    }
                }
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
