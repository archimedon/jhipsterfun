package com.rdnsn.kingston.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Answer entity.
 */
public class AnswerDTO implements Serializable {

    private Long id;

    @NotNull
    private String posit;

    @NotNull
    private Boolean correct;

    @NotNull
    private Boolean usePositWithFile;

    private Set<FileDTO> files = new HashSet<>();

    private Long questionId;

    private String questionAsk;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosit() {
        return posit;
    }

    public void setPosit(String posit) {
        this.posit = posit;
    }

    public Boolean isCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public Boolean isUsePositWithFile() {
        return usePositWithFile;
    }

    public void setUsePositWithFile(Boolean usePositWithFile) {
        this.usePositWithFile = usePositWithFile;
    }

    public Set<FileDTO> getFiles() {
        return files;
    }

    public void setFiles(Set<FileDTO> files) {
        this.files = files;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getQuestionAsk() {
        return questionAsk;
    }

    public void setQuestionAsk(String questionAsk) {
        this.questionAsk = questionAsk;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AnswerDTO answerDTO = (AnswerDTO) o;
        if (answerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), answerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AnswerDTO{" +
            "id=" + getId() +
            ", posit='" + getPosit() + "'" +
            ", correct='" + isCorrect() + "'" +
            ", usePositWithFile='" + isUsePositWithFile() + "'" +
            ", question=" + getQuestionId() +
            ", question='" + getQuestionAsk() + "'" +
            "}";
    }
}
