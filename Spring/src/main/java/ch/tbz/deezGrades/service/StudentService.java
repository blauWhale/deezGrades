package ch.tbz.deezGrades.service;

import ch.tbz.deezGrades.model.Student;
import ch.tbz.deezGrades.persistence.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api") //to be changed
public class StudentService {

    @Autowired
    StudentRepository studentRepository;


    @PostMapping(value = "/Student")
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Student> createStudent(@RequestBody @Valid Student request) {
        return persistStudent(request);
    }


    @PutMapping(value = "/Student")
    @Transactional
    public ResponseEntity<Student> updateStudentById(@RequestBody @Valid Student request) {
        return persistStudent(request);
    }

    private ResponseEntity<Student> persistStudent(Student request) {
        Optional<Student> savedStudent = Optional.of(studentRepository.save(request));
        return ResponseEntity.ok(savedStudent.get());
    }


    @DeleteMapping(value = "/Student/{id}")
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000/")
    public void deleteStudentById(@PathVariable int id) {
        studentRepository.deleteStudentById(id);
    }


    @GetMapping(value = "/Student/{id}")
    @Transactional
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> Student = studentRepository.findById(id);
        return Student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}