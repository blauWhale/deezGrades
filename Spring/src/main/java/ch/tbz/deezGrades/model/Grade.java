package ch.tbz.deezGrades.model;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity(name = "grade")
@Table(name = "grade")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private Float grade;


    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;


    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Course course;
}
