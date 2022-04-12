package ch.tbz.deezGrades.persistence;

import ch.tbz.deezGrades.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    Optional<Course> getCourseById(int id);

    void deleteCourseById(int id);
}
