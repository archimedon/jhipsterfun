package com.rdnsn.kingston.service;

import com.rdnsn.kingston.service.dto.InstructionDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Instruction.
 */
public interface InstructionService {

    /**
     * Save a instruction.
     *
     * @param instructionDTO the entity to save
     * @return the persisted entity
     */
    InstructionDTO save(InstructionDTO instructionDTO);

    /**
     * Get all the instructions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<InstructionDTO> findAll(Pageable pageable);

    /**
     * Get all the Instruction with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<InstructionDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" instruction.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<InstructionDTO> findOne(Long id);

    /**
     * Delete the "id" instruction.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
