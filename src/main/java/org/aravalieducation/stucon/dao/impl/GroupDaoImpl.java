package org.aravalieducation.stucon.dao.impl;

import jakarta.persistence.Query;
import org.aravalieducation.stucon.dao.GroupDao;
import org.aravalieducation.stucon.entity.Group;
import org.aravalieducation.stucon.entity.GroupsHistory;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Repository
public class GroupDaoImpl implements GroupDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public Group addGroup(Group group) {
        Session session = null;
        Group result = null;
        Transaction transaction = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.getTransaction();
            if (!transaction.isActive()) {
                transaction = session.beginTransaction();
            }

            if (session != null) {
                group.setId(UUID.randomUUID().toString());

                GroupsHistory history = new GroupsHistory();
                history.setHistoryId(UUID.randomUUID().toString());
                history.setName(group.getName());
                history.setDescription(group.getDescription());
                history.setGroupId(group.getId());

                history.setAddedAt(Timestamp.from(Instant.now()));
                history.setAddedBy("ADMIN");
                history.setOperation("CREATE");
                history.setGroup(group);

                session.persist(history);
                session.persist(group);

                result = session.load(Group.class, group.getId());
                transaction.commit();
            }
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
            throw e;
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return result;
    }

    @Override
    public Group updateGroup(Group group) {
        Session session = null;
        Group result = null;
        Transaction transaction = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.getTransaction();
            if (!transaction.isActive()) {
                transaction = session.beginTransaction();
            }

            if (session != null) {
                GroupsHistory history = new GroupsHistory();
                history.setHistoryId(UUID.randomUUID().toString());
                history.setName(group.getName());
                history.setDescription(group.getDescription());
                history.setGroupId(group.getId());

                history.setUpdatedAt(Timestamp.from(Instant.now()));
                history.setUpdatedBy("ADMIN");
                history.setOperation("UPDATE");
                history.setGroup(group);

                session.persist(history);
                session.saveOrUpdate(group);

                result = session.load(Group.class, group.getId());
                transaction.commit();
            }
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
            throw e;
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return result;
    }

    @Override
    public Group getGroupByGroupId(String groupId) {
        Session session = null;
        Group result = null;
        try {
            session = sessionFactory.openSession();
            if (session != null) {
                result = session.createQuery("from Group where id = :id", Group.class)
                        .setParameter("id", groupId)
                        .getSingleResult();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return result;
    }

    @Override
    public List<Group> getAllGroups() {
        Session session = null;
        List<Group> result = null;
        try {
            session = sessionFactory.openSession();
            if (session != null) {

                Query query = session.createQuery("from Group", Group.class);
                result = (ArrayList<Group>) query.getResultList();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return result;
    }

    @Override
    public Group deleteGroupByGroupId(String groupId) {
        Session session = null;
        Group result = null;
        Transaction transaction = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.getTransaction();
            if (!transaction.isActive()) {
                transaction = session.beginTransaction();
            }

            if (session != null) {
                result = session.load(Group.class, groupId);

                if (result != null) {
                    // add a history record
                    GroupsHistory history = new GroupsHistory();
                    history.setHistoryId(UUID.randomUUID().toString());
                    history.setName(result.getName());
                    history.setDescription(result.getDescription());
                    history.setGroupId(result.getId());
                    history.setUpdatedBy("ADMIN");
                    history.setUpdatedAt(Timestamp.from(Instant.now()));
                    history.setGroup(result);
                    history.setOperation("DELETE");
                    session.persist(history);

                    // detach histories from the student
                    result.getGroupsHistories().forEach(h -> {
                                h.setGroup(null);
                            }
                    );
                    // delete student
                    session.delete(result);
                } else {
                    // throw exception
                    throw new NoSuchElementException("No group found with id: " + groupId);
                }
                transaction.commit();
            }
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
            throw e;
        } finally {
            if (session != null) {
                session.close();
            }
        }
        return result;
    }
}
