package com.enzulode.dao.entity;

import com.enzulode.dao.entity.common.BusinessEntity;
import com.enzulode.dto.PointDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Entity
@Table(name = "attempts")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AttemptEntity extends BusinessEntity {

    @Id
    @Column(name = "attempt_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "x_coord", nullable = false)
    private Integer x;

    @Column(name = "y_coord", nullable = false)
    private Double y;

    @Column(name = "radius", nullable = false)
    private Integer r;

    @Column(name = "is_hit", nullable = false)
    private Boolean hit;

    public PointDto getPoint() {
        return new PointDto(x, y, r);
    }

    public static AttemptEntity build(PointDto point, Boolean hitCheckResult) {
        return new AttemptEntity(null, point.x(), point.y(), point.r(), hitCheckResult);
    }
}
