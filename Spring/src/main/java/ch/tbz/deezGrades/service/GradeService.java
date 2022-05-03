package ch.tbz.deezGrades.service;

import ch.tbz.deezGrades.model.Course;
import ch.tbz.deezGrades.model.Grade;
import ch.tbz.deezGrades.persistence.CourseRepository;
import ch.tbz.deezGrades.persistence.GradeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api") //to be changed
public class GradeService {

    @Autowired
    GradeRepository gradeRepository;

    @Autowired
    CourseRepository courseRepository;



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



    @GetMapping(value = "/Grade/{student_id}")
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000/")
    public void getAllGradeByStudent(@PathVariable int student_id) {
        Optional<List<Course>> courses = Optional.of(courseRepository.findAll());
        HashMap<Course, List<Grade>> response = new HashMap<>();
        for(Course course: courses.get()){
            Optional<List<Grade>> gradeOfCourse = Optional.of(gradeRepository.findAllGradeByCourseAndStudent(student_id , course.getId()));
            response.put(course,gradeOfCourse.get());
        }

    }

}