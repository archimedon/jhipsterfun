package com.rdnsn.kingston.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rdnsn.kingston.service.InstructionService;
import com.rdnsn.kingston.web.rest.errors.BadRequestAlertException;
import com.rdnsn.kingston.web.rest.util.HeaderUtil;
import com.rdnsn.kingston.web.rest.util.PaginationUtil;
import com.rdnsn.kingston.service.dto.InstructionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Instruction.
 */
@RestController
@RequestMapping("/api")
public class InstructionResource {

    private final Logger log = LoggerFactory.getLogger(InstructionResource.class);

    private static final String ENTITY_NAME = "instruction";

    private final InstructionService instructionService;

    public InstructionResource(InstructionService instructionService) {
        this.instructionService = instructionService;
    }

    /**
     * POST  /instructions : Create a new instruction.
     *
     * @param instructionDTO the instructionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new instructionDTO, or with status 400 (Bad Request) if the instruction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/instructions")
    @Timed
    public ResponseEntity<InstructionDTO> createInstruction(@Valid @RequestBody InstructionDTO instructionDTO) throws URISyntaxException {
        log.debug("REST request to save Instruction : {}", instructionDTO);
        if (instructionDTO.getId() != null) {
            throw new BadRequestAlertException("A new instruction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InstructionDTO result = instructionService.save(instructionDTO);
        return ResponseEntity.created(new URI("/api/instructions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /instructions : Updates an existing instruction.
     *
     * @param instructionDTO the instructionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated instructionDTO,
     * or with status 400 (Bad Request) if the instructionDTO is not valid,
     * or with status 500 (Internal Server Error) if the instructionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/instructions")
    @Timed
    public ResponseEntity<InstructionDTO> updateInstruction(@Valid @RequestBody InstructionDTO instructionDTO) throws URISyntaxException {
        log.debug("REST request to update Instruction : {}", instructionDTO);
        if (instructionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InstructionDTO result = instructionService.save(instructionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, instructionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /instructions : get all the instructions.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of instructions in body
     */
    @GetMapping("/instructions")
    @Timed
    public ResponseEntity<List<InstructionDTO>> getAllInstructions(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Instructions");
        Page<InstructionDTO> page;
        if (eagerload) {
            page = instructionService.findAllWithEagerRelationships(pageable);
        } else {
            page = instructionService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/instructions?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /instructions/:id : get the "id" instruction.
     *
     * @param id the id of the instructionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the instructionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/instructions/{id}")
    @Timed
    public ResponseEntity<InstructionDTO> getInstruction(@PathVariable Long id) {
        log.debug("REST request to get Instruction : {}", id);
        Optional<InstructionDTO> instructionDTO = instructionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(instructionDTO);
    }

    /**
     * DELETE  /instructions/:id : delete the "id" instruction.
     *
     * @param id the id of the instructionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/instructions/{id}")
    @Timed
    public ResponseEntity<Void> deleteInstruction(@PathVariable Long id) {
        log.debug("REST request to delete Instruction : {}", id);
        instructionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
