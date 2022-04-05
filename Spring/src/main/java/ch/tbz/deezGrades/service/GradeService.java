package ch.tbz.deezGrades.service;

import ch.tbz.deezGrades.model.Grade;
import ch.tbz.deezGrades.persistence.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api") //to be changed
public class GradeService {

    @Autowired
    GradeRepository gradeRepository;


    @PostMapping(value = "/Grade")
    @Transactional
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


    @GetMapping(value = "/Grade/{id}")
    @Transactional
    public ResponseEntity<Grade> getGradeById(@PathVariable int id) {
        Optional<Grade> Grade = gradeRepository.findById(id);
        return Grade.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}