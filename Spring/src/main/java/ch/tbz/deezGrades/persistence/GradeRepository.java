package ch.tbz.deezGrades.persistence;

import ch.tbz.deezGrades.model.Grade;
import ch.tbz.deezGrades.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.lang.reflect.GenericArrayType;
import java.util.List;
import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Integer> {

    Optional<Grade> getGradeById(int id);

    @Query(
            value = "SELECT * FROM grade u WHERE u.student_id = :sid AND u.course_id=:cid",
            nativeQuery = true)
    List<Grade> findAllGradeByCourseAndStudent(@Param("sid") int sid, @Param("cid") int cid);

    void deleteGradeById(int id);
}
