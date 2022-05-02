package ch.tbz.deezGrades.service;

import ch.tbz.deezGrades.model.Grade;
import ch.tbz.deezGrades.model.Student;
import ch.tbz.deezGrades.persistence.GradeRepository;
import ch.tbz.deezGrades.persistence.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api") //to be changed
public class GradeService {

    @Autowired
    GradeRepository gradeRepository;

    @Autowired
    StudentRepository studentRepository;


    @PostMapping(value = "/Grade")
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000/")
    public ResponseEntity<Grade> createGrade(@RequestBody @Valid Grade request) {
        return persistGrade(request);
    }


    @PutMapping(value = "/Grade")
    @Transactional
    public ResponseEntity<Grade> updateGradeById(@RequestBody @Valid Grade request) {
        return persistGrade(request);
    }

    private ResponseEntity<Grade> persistGrade(Grade request) {
        Optional<Grade> savedGrade = Optional.of(gradeRepository.save(request));
        return ResponseEntity.ok(savedGrade.get());
    }


    @DeleteMapping(value = "/Grade/{id}")
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000/")
    public void deleteGradeById(@PathVariable int id) {
        gradeRepository.deleteGradeById(id);
    }


}