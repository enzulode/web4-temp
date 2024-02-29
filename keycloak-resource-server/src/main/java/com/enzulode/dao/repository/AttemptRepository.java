package com.enzulode.dao.repository;

import com.enzulode.dao.entity.AttemptEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.PagingAndSortingRepository;
import java.util.List;
import java.util.UUID;

public interface AttemptRepository extends JpaRepository<AttemptEntity, UUID>, PagingAndSortingRepository<AttemptEntity, UUID> {

    List<AttemptEntity> findAllByCreatedBy(String createdBy, Pageable pageable);

    @Modifying
    void deleteAllByCreatedBy(String createdBy);

    List<AttemptEntity> findAllByCreatedBy(String createdBy);
}
