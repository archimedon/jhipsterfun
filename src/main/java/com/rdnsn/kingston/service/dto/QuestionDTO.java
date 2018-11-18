package com.rdnsn.kingston.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.rdnsn.kingston.domain.enumeration.AnswerType;

/**
 * A DTO for the Question entity.
 */
public class QuestionDTO implements Serializable {

    private Long id;

    @NotNull
    private String ask;

    @NotNull
    private AnswerType answersAs;

    private Integer minNumOptions;

    private Set<FileDTO> files = new HashSet<>();

    private Set<AnswerDTO> answers = new HashSet<>();
    public Set<AnswerDTO> getAnswers() { return answers; }
    public void setAnswers(Set<AnswerDTO> answers) { this.answers = answers; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAsk() {
        return ask;
    }

    public void setAsk(String ask) {
        this.ask = ask;
    }

    public AnswerType getAnswersAs() {
        return answersAs;
    }

    public void setAnswersAs(AnswerType answersAs) {
        this.answersAs = answersAs;
    }

    public Integer getMinNumOptions() {
        return minNumOptions;
    }

    public void setMinNumOptions(Integer minNumOptions) {
        this.minNumOptions = minNumOptions;
    }

    public Set<FileDTO> getFiles() {
        return files;
    }

    public void setFiles(Set<FileDTO> files) {
        this.files = files;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionDTO questionDTO = (QuestionDTO) o;
        if (questionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
            "id=" + getId() +
            ", ask='" + getAsk() + "'" +
            ", answersAs='" + getAnswersAs() + "'" +
            ", minNumOptions=" + getMinNumOptions() +
            "}";
    }
}
