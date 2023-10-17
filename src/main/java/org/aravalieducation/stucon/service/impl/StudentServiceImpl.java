package org.aravalieducation.stucon.service.impl;

import jakarta.transaction.Transactional;
import org.aravalieducation.stucon.dao.StudentDao;
import org.aravalieducation.stucon.entity.Student;
import org.aravalieducation.stucon.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentDao;

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Student addStudent(Student student) {
        Student addedStudent = studentDao.addStudent(student);
        return addedStudent;
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Student updateStudent(Student student) {
        Student updatedStudent = studentDao.updateStudent(student);
        return updatedStudent;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Student deleteStudentByRollNumber(String rollNumber) {
        Student deletedStudent = studentDao.deleteStudentByRollNumber(rollNumber);
        return deletedStudent;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public Student getStudentByRollNumber(String rollNumber) {
        Student student = studentDao.getStudentByRollNumber(rollNumber);
        return student;
    }

    @Override
    @PreAuthorize("hasAuthority('APPROLE_Admin')")
    public List<Student> getAllStudents() {
        List<Student> studentList = studentDao.getAllStudents();
        return studentList;
    }

}
