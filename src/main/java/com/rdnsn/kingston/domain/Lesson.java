package com.rdnsn.kingston.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Lesson.
 */
@Entity
@Table(name = "lesson")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "min_num_questions")
    private Integer minNumQuestions;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private User author;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "lesson_instruction",
               joinColumns = @JoinColumn(name = "lessons_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "instructions_id", referencedColumnName = "id"))
    private Set<Instruction> instructions = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "lesson_question",
               joinColumns = @JoinColumn(name = "lessons_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "questions_id", referencedColumnName = "id"))
    private Set<Question> questions = new HashSet<>();

    @ManyToMany(mappedBy = "lessons")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Course> courses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Lesson title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Lesson description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getMinNumQuestions() {
        return minNumQuestions;
    }

    public Lesson minNumQuestions(Integer minNumQuestions) {
        this.minNumQuestions = minNumQuestions;
        return this;
    }

    public void setMinNumQuestions(Integer minNumQuestions) {
        this.minNumQuestions = minNumQuestions;
    }

    public User getAuthor() {
        return author;
    }

    public Lesson author(User user) {
        this.author = user;
        return this;
    }

    public void setAuthor(User user) {
        this.author = user;
    }

    public Set<Instruction> getInstructions() {
        return instructions;
    }

    public Lesson instructions(Set<Instruction> instructions) {
        this.instructions = instructions;
        return this;
    }

    public Lesson addInstruction(Instruction instruction) {
        this.instructions.add(instruction);
        instruction.getLessons().add(this);
        return this;
    }

    public Lesson removeInstruction(Instruction instruction) {
        this.instructions.remove(instruction);
        instruction.getLessons().remove(this);
        return this;
    }

    public void setInstructions(Set<Instruction> instructions) {
        this.instructions = instructions;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Lesson questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Lesson addQuestion(Question question) {
        this.questions.add(question);
        question.getLessons().add(this);
        return this;
    }

    public Lesson removeQuestion(Question question) {
        this.questions.remove(question);
        question.getLessons().remove(this);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Lesson courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Lesson addCourse(Course course) {
        this.courses.add(course);
        course.getLessons().add(this);
        return this;
    }

    public Lesson removeCourse(Course course) {
        this.courses.remove(course);
        course.getLessons().remove(this);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Lesson lesson = (Lesson) o;
        if (lesson.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lesson.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lesson{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", minNumQuestions=" + getMinNumQuestions() +
            "}";
    }
}
