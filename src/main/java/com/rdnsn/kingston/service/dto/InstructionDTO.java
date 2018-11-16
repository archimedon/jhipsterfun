package com.rdnsn.kingston.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.rdnsn.kingston.domain.enumeration.InputMimeWrap;

/**
 * A DTO for the Instruction entity.
 */
public class InstructionDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @Lob
    private String input;

    private InputMimeWrap inputMimeWrap;

    private Long creatorId;

    private String creatorLogin;

    private Set<FileDTO> files = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public InputMimeWrap getInputMimeWrap() {
        return inputMimeWrap;
    }

    public void setInputMimeWrap(InputMimeWrap inputMimeWrap) {
        this.inputMimeWrap = inputMimeWrap;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long userId) {
        this.creatorId = userId;
    }

    public String getCreatorLogin() {
        return creatorLogin;
    }

    public void setCreatorLogin(String userLogin) {
        this.creatorLogin = userLogin;
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

        InstructionDTO instructionDTO = (InstructionDTO) o;
        if (instructionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), instructionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InstructionDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", input='" + getInput() + "'" +
            ", inputMimeWrap='" + getInputMimeWrap() + "'" +
            ", creator=" + getCreatorId() +
            ", creator='" + getCreatorLogin() + "'" +
            "}";
    }
}
