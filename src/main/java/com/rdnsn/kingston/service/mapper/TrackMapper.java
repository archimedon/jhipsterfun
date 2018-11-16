package com.rdnsn.kingston.service.mapper;

import com.rdnsn.kingston.domain.*;
import com.rdnsn.kingston.service.dto.TrackDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Track and its DTO TrackDTO.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class})
public interface TrackMapper extends EntityMapper<TrackDTO, Track> {



    default Track fromId(Long id) {
        if (id == null) {
            return null;
        }
        Track track = new Track();
        track.setId(id);
        return track;
    }
}
