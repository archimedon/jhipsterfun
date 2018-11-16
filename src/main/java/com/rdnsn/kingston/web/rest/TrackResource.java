package com.rdnsn.kingston.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rdnsn.kingston.service.TrackService;
import com.rdnsn.kingston.web.rest.errors.BadRequestAlertException;
import com.rdnsn.kingston.web.rest.util.HeaderUtil;
import com.rdnsn.kingston.service.dto.TrackDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Track.
 */
@RestController
@RequestMapping("/api")
public class TrackResource {

    private final Logger log = LoggerFactory.getLogger(TrackResource.class);

    private static final String ENTITY_NAME = "track";

    private final TrackService trackService;

    public TrackResource(TrackService trackService) {
        this.trackService = trackService;
    }

    /**
     * POST  /tracks : Create a new track.
     *
     * @param trackDTO the trackDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new trackDTO, or with status 400 (Bad Request) if the track has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tracks")
    @Timed
    public ResponseEntity<TrackDTO> createTrack(@Valid @RequestBody TrackDTO trackDTO) throws URISyntaxException {
        log.debug("REST request to save Track : {}", trackDTO);
        if (trackDTO.getId() != null) {
            throw new BadRequestAlertException("A new track cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrackDTO result = trackService.save(trackDTO);
        return ResponseEntity.created(new URI("/api/tracks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tracks : Updates an existing track.
     *
     * @param trackDTO the trackDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated trackDTO,
     * or with status 400 (Bad Request) if the trackDTO is not valid,
     * or with status 500 (Internal Server Error) if the trackDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tracks")
    @Timed
    public ResponseEntity<TrackDTO> updateTrack(@Valid @RequestBody TrackDTO trackDTO) throws URISyntaxException {
        log.debug("REST request to update Track : {}", trackDTO);
        if (trackDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrackDTO result = trackService.save(trackDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, trackDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tracks : get all the tracks.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of tracks in body
     */
    @GetMapping("/tracks")
    @Timed
    public List<TrackDTO> getAllTracks(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Tracks");
        return trackService.findAll();
    }

    /**
     * GET  /tracks/:id : get the "id" track.
     *
     * @param id the id of the trackDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the trackDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tracks/{id}")
    @Timed
    public ResponseEntity<TrackDTO> getTrack(@PathVariable Long id) {
        log.debug("REST request to get Track : {}", id);
        Optional<TrackDTO> trackDTO = trackService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trackDTO);
    }

    /**
     * DELETE  /tracks/:id : delete the "id" track.
     *
     * @param id the id of the trackDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tracks/{id}")
    @Timed
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        log.debug("REST request to delete Track : {}", id);
        trackService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
