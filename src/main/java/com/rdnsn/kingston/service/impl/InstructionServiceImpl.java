package com.rdnsn.kingston.service.impl;

import com.rdnsn.kingston.service.InstructionService;
import com.rdnsn.kingston.domain.Instruction;
import com.rdnsn.kingston.repository.InstructionRepository;
import com.rdnsn.kingston.service.dto.InstructionDTO;
import com.rdnsn.kingston.service.mapper.InstructionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Instruction.
 */
@Service
@Transactional
public class InstructionServiceImpl implements InstructionService {

    private final Logger log = LoggerFactory.getLogger(InstructionServiceImpl.class);

    private final InstructionRepository instructionRepository;

    private final InstructionMapper instructionMapper;

    public InstructionServiceImpl(InstructionRepository instructionRepository, InstructionMapper instructionMapper) {
        this.instructionRepository = instructionRepository;
        this.instructionMapper = instructionMapper;
    }

    /**
     * Save a instruction.
     *
     * @param instructionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InstructionDTO save(InstructionDTO instructionDTO) {
        log.debug("Request to save Instruction : {}", instructionDTO);

        Instruction instruction = instructionMapper.toEntity(instructionDTO);
        instruction = instructionRepository.save(instruction);
        return instructionMapper.toDto(instruction);
    }

    /**
     * Get all the instructions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InstructionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Instructions");
        return instructionRepository.findAll(pageable)
            .map(instructionMapper::toDto);
    }

    /**
     * Get all the Instruction with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<InstructionDTO> findAllWithEagerRelationships(Pageable pageable) {
        return instructionRepository.findAllWithEagerRelationships(pageable).map(instructionMapper::toDto);
    }
    

    /**
     * Get one instruction by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<InstructionDTO> findOne(Long id) {
        log.debug("Request to get Instruction : {}", id);
        return instructionRepository.findOneWithEagerRelationships(id)
            .map(instructionMapper::toDto);
    }

    /**
     * Delete the instruction by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Instruction : {}", id);
        instructionRepository.deleteById(id);
    }
}
