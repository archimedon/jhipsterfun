package com.rdnsn.kingston.service.mapper;

import com.rdnsn.kingston.domain.*;
import com.rdnsn.kingston.service.dto.FileDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity File and its DTO FileDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FileMapper extends EntityMapper<FileDTO, File> {


    @Mapping(target = "instructions", ignore = true)
    @Mapping(target = "answers", ignore = true)
    @Mapping(target = "questions", ignore = true)
    File toEntity(FileDTO fileDTO);

    default File fromId(Long id) {
        if (id == null) {
            return null;
        }
        File file = new File();
        file.setId(id);
        return file;
    }
}
