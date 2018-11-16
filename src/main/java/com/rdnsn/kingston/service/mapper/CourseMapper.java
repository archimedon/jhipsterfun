package com.rdnsn.kingston.service.mapper;

import com.rdnsn.kingston.domain.*;
import com.rdnsn.kingston.service.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Course and its DTO CourseDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, LessonMapper.class})
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    CourseDTO toDto(Course course);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "tracks", ignore = true)
    Course toEntity(CourseDTO courseDTO);

    default Course fromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
