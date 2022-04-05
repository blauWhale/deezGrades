package ch.tbz.deezGrades.persistence;

import ch.tbz.deezGrades.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    Optional<Student> getStudentById(int id);

    void deleteStudentById(int id);
}
