package org.aravalieducation.stucon.controller;

import org.aravalieducation.stucon.entity.MessageType;
import org.aravalieducation.stucon.service.MetadataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/metadata", produces = MediaType.APPLICATION_JSON_VALUE)
public class MetadataController {

    @Autowired
    private MetadataService metadataService;

    @GetMapping("/message-types")
    public ResponseEntity<List<MessageType>> getMessageTypes() {
        List<MessageType> messageTypeList = metadataService.getMessageTypes();
        return new ResponseEntity<>(messageTypeList, HttpStatus.OK);
    }
}
