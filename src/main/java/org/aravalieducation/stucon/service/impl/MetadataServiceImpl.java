package org.aravalieducation.stucon.service.impl;

import org.aravalieducation.stucon.entity.MessageType;
import org.aravalieducation.stucon.repository.MetadataRepository;
import org.aravalieducation.stucon.service.MetadataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetadataServiceImpl implements MetadataService {

    @Autowired
    private MetadataRepository metadataRepository;

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<MessageType> getMessageTypes() {
        return metadataRepository.getMessageTypes();
    }
}
