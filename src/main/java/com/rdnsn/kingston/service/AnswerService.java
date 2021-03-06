package com.rdnsn.kingston.service;

import com.rdnsn.kingston.service.dto.AnswerDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Answer.
 */
public interface AnswerService {

    /**
     * Save a answer.
     *
     * @param answerDTO the entity to save
     * @return the persisted entity
     */
    AnswerDTO save(AnswerDTO answerDTO);

    /**
     * Get all the answers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AnswerDTO> findAll(Pageable pageable);

    /**
     * Get all the Answer with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<AnswerDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" answer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AnswerDTO> findOne(Long id);

    /**
     * Delete the "id" answer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
