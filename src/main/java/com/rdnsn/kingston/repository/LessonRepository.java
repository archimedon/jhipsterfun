package com.rdnsn.kingston.repository;

import com.rdnsn.kingston.domain.Lesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Lesson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

    @Query("select lesson from Lesson lesson where lesson.author.login = ?#{principal.username}")
    List<Lesson> findByAuthorIsCurrentUser();

    @Query(value = "select distinct lesson from Lesson lesson left join fetch lesson.instructions left join fetch lesson.questions",
        countQuery = "select count(distinct lesson) from Lesson lesson")
    Page<Lesson> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct lesson from Lesson lesson left join fetch lesson.instructions left join fetch lesson.questions")
    List<Lesson> findAllWithEagerRelationships();

    @Query("select lesson from Lesson lesson left join fetch lesson.instructions left join fetch lesson.questions where lesson.id =:id")
    Optional<Lesson> findOneWithEagerRelationships(@Param("id") Long id);

}
