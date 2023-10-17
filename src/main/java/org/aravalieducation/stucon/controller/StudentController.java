package org.aravalieducation.stucon.controller;

import org.aravalieducation.stucon.entity.Student;
import org.aravalieducation.stucon.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/students", produces = MediaType.APPLICATION_JSON_VALUE)
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student addedStudent = studentService.addStudent(student);
        return new ResponseEntity<>(addedStudent, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
        Student updatedStudent = studentService.updateStudent(student);
        return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
    }

    @DeleteMapping("/{rollNumber}")
    public ResponseEntity<Student> deleteStudentByRollNumber(@PathVariable("rollNumber") String rollNumber) {
        Student deletedStudent = studentService.deleteStudentByRollNumber(rollNumber);
        return new ResponseEntity<>(deletedStudent, HttpStatus.OK);
    }

    @GetMapping("/{rollNumber}")
    public ResponseEntity<Student> getStudentByRollNumber(@PathVariable("rollNumber") String rollNumber) {
        Student student = studentService.getStudentByRollNumber(rollNumber);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> studentList = studentService.getAllStudents();
        return new ResponseEntity<>(studentList, HttpStatus.OK);
    }
}
