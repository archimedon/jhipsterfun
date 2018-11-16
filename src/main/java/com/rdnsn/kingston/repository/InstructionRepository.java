package com.rdnsn.kingston.repository;

import com.rdnsn.kingston.domain.Instruction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Instruction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstructionRepository extends JpaRepository<Instruction, Long> {

    @Query("select instruction from Instruction instruction where instruction.creator.login = ?#{principal.username}")
    List<Instruction> findByCreatorIsCurrentUser();

    @Query(value = "select distinct instruction from Instruction instruction left join fetch instruction.files",
        countQuery = "select count(distinct instruction) from Instruction instruction")
    Page<Instruction> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct instruction from Instruction instruction left join fetch instruction.files")
    List<Instruction> findAllWithEagerRelationships();

    @Query("select instruction from Instruction instruction left join fetch instruction.files where instruction.id =:id")
    Optional<Instruction> findOneWithEagerRelationships(@Param("id") Long id);

}
