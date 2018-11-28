package com.rdnsn.kingston.service;

import com.rdnsn.kingston.service.dto.CategoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Category.
 */
public interface CategoryService {

    /**
     * Save a category.
     *
     * @param categoryDTO the entity to save
     * @return the persisted entity
     */
    CategoryDTO save(CategoryDTO categoryDTO);

    /**
     * Get all the categories.
     *
     * @return the list of entities
     */
    List<CategoryDTO> findAll();


    /**
     * Get the "id" category.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CategoryDTO> findOne(Long id);

    /**
     * Delete the "id" category.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
