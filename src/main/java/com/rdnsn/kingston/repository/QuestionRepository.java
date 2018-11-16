package com.rdnsn.kingston.repository;

import com.rdnsn.kingston.domain.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Question entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "select distinct question from Question question left join fetch question.files",
        countQuery = "select count(distinct question) from Question question")
    Page<Question> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct question from Question question left join fetch question.files")
    List<Question> findAllWithEagerRelationships();

    @Query("select question from Question question left join fetch question.files where question.id =:id")
    Optional<Question> findOneWithEagerRelationships(@Param("id") Long id);

}
