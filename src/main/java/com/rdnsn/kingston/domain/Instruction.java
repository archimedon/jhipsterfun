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

import com.rdnsn.kingston.domain.enumeration.InputMimeWrap;

/**
 * A Instruction.
 */
@Entity
@Table(name = "instruction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Instruction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "input")
    private String input;

    @Enumerated(EnumType.STRING)
    @Column(name = "input_mime_wrap")
    private InputMimeWrap inputMimeWrap;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private User creator;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "instruction_file",
               joinColumns = @JoinColumn(name = "instructions_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "files_id", referencedColumnName = "id"))
    private Set<File> files = new HashSet<>();

    @ManyToMany(mappedBy = "instructions")
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

    public String getTitle() {
        return title;
    }

    public Instruction title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInput() {
        return input;
    }

    public Instruction input(String input) {
        this.input = input;
        return this;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public InputMimeWrap getInputMimeWrap() {
        return inputMimeWrap;
    }

    public Instruction inputMimeWrap(InputMimeWrap inputMimeWrap) {
        this.inputMimeWrap = inputMimeWrap;
        return this;
    }

    public void setInputMimeWrap(InputMimeWrap inputMimeWrap) {
        this.inputMimeWrap = inputMimeWrap;
    }

    public User getCreator() {
        return creator;
    }

    public Instruction creator(User user) {
        this.creator = user;
        return this;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public Set<File> getFiles() {
        return files;
    }

    public Instruction files(Set<File> files) {
        this.files = files;
        return this;
    }

    public Instruction addFile(File file) {
        this.files.add(file);
        file.getInstructions().add(this);
        return this;
    }

    public Instruction removeFile(File file) {
        this.files.remove(file);
        file.getInstructions().remove(this);
        return this;
    }

    public void setFiles(Set<File> files) {
        this.files = files;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Instruction lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Instruction addLesson(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.getInstructions().add(this);
        return this;
    }

    public Instruction removeLesson(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.getInstructions().remove(this);
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
        Instruction instruction = (Instruction) o;
        if (instruction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), instruction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Instruction{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", input='" + getInput() + "'" +
            ", inputMimeWrap='" + getInputMimeWrap() + "'" +
            "}";
    }
}
