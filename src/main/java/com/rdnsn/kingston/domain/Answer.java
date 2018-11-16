package com.rdnsn.kingston.domain;

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
 * A Answer.
 */
@Entity
@Table(name = "answer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Answer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "posit", nullable = false)
    private String posit;

    @NotNull
    @Column(name = "correct", nullable = false)
    private Boolean correct;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "answer_file",
               joinColumns = @JoinColumn(name = "answers_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "files_id", referencedColumnName = "id"))
    private Set<File> files = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("answers")
    private Question question;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosit() {
        return posit;
    }

    public Answer posit(String posit) {
        this.posit = posit;
        return this;
    }

    public void setPosit(String posit) {
        this.posit = posit;
    }

    public Boolean isCorrect() {
        return correct;
    }

    public Answer correct(Boolean correct) {
        this.correct = correct;
        return this;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public Set<File> getFiles() {
        return files;
    }

    public Answer files(Set<File> files) {
        this.files = files;
        return this;
    }

    public Answer addFile(File file) {
        this.files.add(file);
        file.getAnswers().add(this);
        return this;
    }

    public Answer removeFile(File file) {
        this.files.remove(file);
        file.getAnswers().remove(this);
        return this;
    }

    public void setFiles(Set<File> files) {
        this.files = files;
    }

    public Question getQuestion() {
        return question;
    }

    public Answer question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
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
        Answer answer = (Answer) o;
        if (answer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), answer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Answer{" +
            "id=" + getId() +
            ", posit='" + getPosit() + "'" +
            ", correct='" + isCorrect() + "'" +
            "}";
    }
}
