package ch.tbz.deezGrades.persistence;

import ch.tbz.deezGrades.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Integer> {

    Optional<Grade> getGradeById(int id);

    void deleteGradeById(int id);
}
