package org.aravalieducation.stucon.repository;

import org.aravalieducation.stucon.entity.MessageType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MetadataRepository {

    @Autowired
    private SessionFactory sessionFactory;


    public List<MessageType> getMessageTypes() {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            if (session != null) {
                Query<MessageType> sessionQuery = session.createQuery("SELECT m FROM MessageType m", MessageType.class);
                return sessionQuery.getResultList();
            }

            return new ArrayList<>();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return new ArrayList<>();
    }
}
