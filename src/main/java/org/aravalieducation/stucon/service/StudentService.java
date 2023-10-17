package org.aravalieducation.stucon.service;

import org.aravalieducation.stucon.entity.Student;

import java.util.List;

public interface StudentService {
    Student addStudent(Student student);

    Student updateStudent(Student student);

    Student deleteStudentByRollNumber(String rollNumber);

    Student getStudentByRollNumber(String rollNumber);

    List<Student> getAllStudents();

//    List<Student> getAllStudentsByGroupId(String groupId);
//
//    List<Student> getAllStudentsByGroupName(String groupName);
//
//    List<Student> getAllStudentsByGroupCode(String groupCode);
}
