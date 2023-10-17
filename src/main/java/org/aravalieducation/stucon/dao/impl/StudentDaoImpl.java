package org.aravalieducation.stucon.dao.impl;

import jakarta.persistence.Query;
import org.aravalieducation.stucon.dao.StudentDao;
import org.aravalieducation.stucon.entity.Student;
import org.aravalieducation.stucon.entity.StudentsHistory;
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
public class StudentDaoImpl implements StudentDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public Student addStudent(Student student) {
        Session session = null;
        Student addedStudent = null;
        Transaction transaction = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.getTransaction();
            if (!transaction.isActive()) {
                transaction = session.beginTransaction();
            }

            if (session != null) {
                StudentsHistory history = new StudentsHistory();
                history.setHistoryId(UUID.randomUUID().toString());
                history.setEmailId(student.getEmailId());
                history.setFirstName(student.getFirstName());
                history.setLastName(student.getLastName());
                history.setMiddleName(student.getMiddleName());
                history.setMobileNumber(student.getMobileNumber());
                history.setParentMobileNumber(student.getParentMobileNumber());
                history.setStRollNumber(student.getRollNumber());
                history.setAddedBy("ADMIN");
                history.setAddedAt(Timestamp.from(Instant.now()));
                history.setStudent(student);
                history.setOperation("CREATE");

                session.persist(student);
                session.persist(history);

                addedStudent = session.load(Student.class, student.getRollNumber());
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
        return addedStudent;
    }

    @Override
    public Student updateStudent(Student student) {
        Session session = null;
        Student result = null;
        Transaction transaction = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.getTransaction();
            if (!transaction.isActive()) {
                transaction = session.beginTransaction();
            }

            if (session != null) {
                StudentsHistory history = new StudentsHistory();
                history.setHistoryId(UUID.randomUUID().toString());
                history.setEmailId(student.getEmailId());
                history.setFirstName(student.getFirstName());
                history.setLastName(student.getLastName());
                history.setMiddleName(student.getMiddleName());
                history.setMobileNumber(student.getMobileNumber());
                history.setParentMobileNumber(student.getParentMobileNumber());
                history.setStRollNumber(student.getRollNumber());
                history.setUpdatedBy("ADMIN");
                history.setUpdatedAt(Timestamp.from(Instant.now()));
                history.setStudent(student);
                history.setOperation("UPDATE");

                session.saveOrUpdate(student);
                session.persist(history);

                result = session.load(Student.class, student.getRollNumber());
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
    public Student deleteStudentByRollNumber(String rollNumber) {
        Session session = null;
        Student result = null;
        Transaction transaction = null;
        try {
            session = sessionFactory.openSession();
            transaction = session.getTransaction();
            if (!transaction.isActive()) {
                transaction = session.beginTransaction();
            }

            if (session != null) {

                result = session.load(Student.class, rollNumber);

                if (result != null) {
                    // add a history record
                    StudentsHistory history = new StudentsHistory();
                    history.setHistoryId(UUID.randomUUID().toString());
                    history.setEmailId(result.getEmailId());
                    history.setFirstName(result.getFirstName());
                    history.setLastName(result.getLastName());
                    history.setMiddleName(result.getMiddleName());
                    history.setMobileNumber(result.getMobileNumber());
                    history.setParentMobileNumber(result.getParentMobileNumber());
                    history.setStRollNumber(result.getRollNumber());
                    history.setUpdatedBy("ADMIN");
                    history.setUpdatedAt(Timestamp.from(Instant.now()));
                    history.setStudent(result);
                    history.setOperation("DELETE");
                    session.persist(history);

                    // detach histories from the student
                    result.getStudentHistories().forEach(h -> {
                                h.setStudent(null);
                            }
                    );
                    // delete student
                    session.delete(result);
                } else {
                    // throw exception
                    throw new NoSuchElementException("No such student found with roll number: " + rollNumber);
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

    @Override
    public Student getStudentByRollNumber(String rollNumber) {
        Session session = null;
        Student result = null;
        try {
            session = sessionFactory.openSession();
            if (session != null) {
                result = session.createQuery("from Student where rollNumber = :rollNumber", Student.class)
                        .setParameter("rollNumber", rollNumber)
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
    public List<Student> getAllStudents() {
        Session session = null;
        List<Student> result = null;
        try {
            session = sessionFactory.openSession();
            if (session != null) {

                Query query = session.createQuery("from Student", Student.class);
                result = (ArrayList<Student>) query.getResultList();
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
}
