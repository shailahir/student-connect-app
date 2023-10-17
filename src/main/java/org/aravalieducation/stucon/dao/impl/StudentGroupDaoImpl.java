package org.aravalieducation.stucon.dao.impl;

import org.aravalieducation.stucon.dao.StudentGroupDao;
import org.aravalieducation.stucon.entity.Group;
import org.aravalieducation.stucon.entity.GroupMembership;
import org.aravalieducation.stucon.entity.Student;
import org.aravalieducation.stucon.model.GroupStudentsRequest;
import org.aravalieducation.stucon.model.IdObj;
import org.aravalieducation.stucon.model.StudentGroupsRequest;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public class StudentGroupDaoImpl implements StudentGroupDao {
    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<GroupMembership> updateGroupsForStudent(StudentGroupsRequest studentGroupsRequest) {
        Session session = null;
        List<GroupMembership> result = null;
        Transaction transaction = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.getTransaction();
            if (!transaction.isActive()) {
                transaction = session.beginTransaction();
            }

            if (session != null) {
                // Delete all existing memberships for this student
                session.createQuery("delete from GroupMembership where student.rollNumber = :rollNumber")
                        .setParameter("rollNumber", studentGroupsRequest.getRollNumber())
                        .executeUpdate();

                // Add new memberships
                for (IdObj obj : studentGroupsRequest.getGroups()) {
                    GroupMembership groupMembership = new GroupMembership();
                    groupMembership.setId(UUID.randomUUID().toString());

                    Group group = session.load(Group.class, obj.getId());
                    Student student = session.load(Student.class, studentGroupsRequest.getRollNumber());
                    groupMembership.setGroup(group);
                    groupMembership.setStudent(student);
                    groupMembership.setAddedOn(Timestamp.from(Instant.now()));

                    session.persist(groupMembership);
                }

                // Get all memberships for this student
                result = session.createQuery("from GroupMembership where student.rollNumber = :rollNumber")
                        .setParameter("rollNumber", studentGroupsRequest.getRollNumber())
                        .list();

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
    public List<GroupMembership> updateStudentsForGroup(GroupStudentsRequest groupStudentsRequest) {
        Session session = null;
        List<GroupMembership> result = null;
        Transaction transaction = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.getTransaction();
            if (!transaction.isActive()) {
                transaction = session.beginTransaction();
            }

            if (session != null) {
                // Delete all existing memberships for this group
                session.createQuery("delete from GroupMembership where group.id = :groupId")
                        .setParameter("groupId", groupStudentsRequest.getGroupId())
                        .executeUpdate();

                // Add new memberships
                for (IdObj obj : groupStudentsRequest.getStudents()) {
                    GroupMembership groupMembership = new GroupMembership();
                    groupMembership.setId(UUID.randomUUID().toString());

                    Group group = session.load(Group.class, groupStudentsRequest.getGroupId());
                    Student student = session.load(Student.class, obj.getId());
                    groupMembership.setGroup(group);
                    groupMembership.setStudent(student);
                    groupMembership.setAddedOn(Timestamp.from(Instant.now()));

                    session.persist(groupMembership);
                }

                // Get all memberships for this group
                result = session.createQuery("from GroupMembership where group.id = :groupId")
                        .setParameter("groupId", groupStudentsRequest.getGroupId())
                        .list();

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
