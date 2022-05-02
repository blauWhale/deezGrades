package ch.tbz.deezGrades.service;

import ch.tbz.deezGrades.model.Course;
import ch.tbz.deezGrades.model.Student;
import ch.tbz.deezGrades.persistence.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api") //to be changed
public class CourseService {

    @Autowired
    CourseRepository courseRepository;


    @PostMapping(value = "/Course")
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000/")
    public ResponseEntity<Course> createCourse(@RequestBody @Valid Course request) {
        return persistCourse(request);
    }


    @PutMapping(value = "/Course")
    @Transactional
    public ResponseEntity<Course> updateCourseById(@RequestBody @Valid Course request) {
        return persistCourse(request);
    }

    private ResponseEntity<Course> persistCourse(Course request) {
        Optional<Course> savedCourse = Optional.of(courseRepository.save(request));
        return ResponseEntity.ok(savedCourse.get());
    }


    @DeleteMapping(value = "/Course/{id}")
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000/")
    public void deleteCourseById(@PathVariable int id) {
        courseRepository.deleteCourseById(id);
    }


    @GetMapping(value = "/Course/{id}")
    @Transactional
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        Optional<Course> Course = courseRepository.findById(id);
        return Course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/Course")
    @Transactional
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Course>> getAllCourses() {
        Optional<List<Course>> course = Optional.of(courseRepository.findAll());
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}