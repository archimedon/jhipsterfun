package com.rdnsn.kingston.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "ask", nullable = false)
    private String ask;

    @Column(name = "min_num_options")
    private Integer minNumOptions;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Answer> answers = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "question_file",
               joinColumns = @JoinColumn(name = "questions_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "files_id", referencedColumnName = "id"))
    private Set<File> files = new HashSet<>();

    @ManyToMany(mappedBy = "questions")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Lesson> lessons = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAsk() {
        return ask;
    }

    public Question ask(String ask) {
        this.ask = ask;
        return this;
    }

    public void setAsk(String ask) {
        this.ask = ask;
    }

    public Integer getMinNumOptions() {
        return minNumOptions;
    }

    public Question minNumOptions(Integer minNumOptions) {
        this.minNumOptions = minNumOptions;
        return this;
    }

    public void setMinNumOptions(Integer minNumOptions) {
        this.minNumOptions = minNumOptions;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public Question answers(Set<Answer> answers) {
        this.answers = answers;
        return this;
    }

    public Question addAnswer(Answer answer) {
        this.answers.add(answer);
        answer.setQuestion(this);
        return this;
    }

    public Question removeAnswer(Answer answer) {
        this.answers.remove(answer);
        answer.setQuestion(null);
        return this;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }

    public Set<File> getFiles() {
        return files;
    }

    public Question files(Set<File> files) {
        this.files = files;
        return this;
    }

    public Question addFile(File file) {
        this.files.add(file);
        file.getQuestions().add(this);
        return this;
    }

    public Question removeFile(File file) {
        this.files.remove(file);
        file.getQuestions().remove(this);
        return this;
    }

    public void setFiles(Set<File> files) {
        this.files = files;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Question lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Question addLesson(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.getQuestions().add(this);
        return this;
    }

    public Question removeLesson(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.getQuestions().remove(this);
        return this;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
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
        Question question = (Question) o;
        if (question.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), question.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", ask='" + getAsk() + "'" +
            ", minNumOptions=" + getMinNumOptions() +
            "}";
    }
}
