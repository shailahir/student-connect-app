package org.aravalieducation.stucon.dao;

import org.aravalieducation.stucon.entity.Student;

import java.util.List;

public interface StudentDao {
    Student addStudent(Student student);

    Student updateStudent(Student student);

    Student deleteStudentByRollNumber(String rollNumber);

    Student getStudentByRollNumber(String rollNumber);

    List<Student> getAllStudents();
}
