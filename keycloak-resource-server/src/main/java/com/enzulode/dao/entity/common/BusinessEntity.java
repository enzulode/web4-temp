package com.enzulode.dao.entity.common;


import com.enzulode.exception.EntityCreationException;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.context.SecurityContextHolder;
import java.security.Principal;
import java.time.Instant;

@MappedSuperclass
@Getter
@Setter
public abstract class BusinessEntity {


    @Column(name = "created_by", nullable = false)
    private String createdBy;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @PrePersist
    protected void addInfoBeforePersist() {
        this.createdAt = Instant.now();
        this.createdBy = findUserName();
    }

    private String findUserName() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        if (principal == null)
            throw new EntityCreationException("Unable to determine entity owner");

        return principal.getName();
    }
}
