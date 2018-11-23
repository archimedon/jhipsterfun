package com.rdnsn.kingston.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.rdnsn.kingston.domain.enumeration.Category;

/**
 * A DTO for the File entity.
 */
public class FileDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Category category;

    @Lob
    private byte[] data;
    private String dataContentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getDataContentType() {
        return dataContentType;
    }

    public void setDataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FileDTO fileDTO = (FileDTO) o;
        if (fileDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fileDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FileDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", category='" + getCategory() + "'" +
            ", data='" + getData() + "'" +
            "}";
    }
}
