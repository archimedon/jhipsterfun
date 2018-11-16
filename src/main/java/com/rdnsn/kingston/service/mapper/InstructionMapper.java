package com.rdnsn.kingston.service.mapper;

import com.rdnsn.kingston.domain.*;
import com.rdnsn.kingston.service.dto.InstructionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Instruction and its DTO InstructionDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, FileMapper.class})
public interface InstructionMapper extends EntityMapper<InstructionDTO, Instruction> {

    @Mapping(source = "creator.id", target = "creatorId")
    @Mapping(source = "creator.login", target = "creatorLogin")
    InstructionDTO toDto(Instruction instruction);

    @Mapping(source = "creatorId", target = "creator")
    @Mapping(target = "lessons", ignore = true)
    Instruction toEntity(InstructionDTO instructionDTO);

    default Instruction fromId(Long id) {
        if (id == null) {
            return null;
        }
        Instruction instruction = new Instruction();
        instruction.setId(id);
        return instruction;
    }
}
