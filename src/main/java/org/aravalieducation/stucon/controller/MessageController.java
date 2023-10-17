package org.aravalieducation.stucon.controller;

import org.aravalieducation.stucon.entity.Message;
import org.aravalieducation.stucon.entity.MessageSchedule;
import org.aravalieducation.stucon.model.MessageRequest;
import org.aravalieducation.stucon.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/messages", produces = MediaType.APPLICATION_JSON_VALUE)
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<Message> saveMessage(@RequestBody MessageRequest messageRequest) {
        Message savedMessage = messageService.saveMessage(messageRequest);
        return new ResponseEntity<>(savedMessage, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Message>> getAllMessages() {
        List<Message> messages = messageService.getAllMessages();
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable String id) {
        Message message = messageService.getMessageById(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/schedules")
    public ResponseEntity<List<MessageSchedule>> getAllMessageSchedules() {
        List<MessageSchedule> messageSchedules = messageService.getAllMessageSchedules();
        return new ResponseEntity<>(messageSchedules, HttpStatus.OK);
    }

    @GetMapping("/schedules/{id}")
    public ResponseEntity<MessageSchedule> getMessageScheduleById(@PathVariable("id") String id) {
        MessageSchedule messageSchedule = messageService.getMessageScheduleById(id);
        return new ResponseEntity<>(messageSchedule, HttpStatus.OK);
    }

    @GetMapping("/schedules/{id}/messages")
    public ResponseEntity<Message> getMessageByScheduleId(@PathVariable("id") String id) {
        Message message = messageService.getMessageByScheduleId(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
