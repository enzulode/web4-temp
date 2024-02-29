package com.enzulode.dto;

import com.enzulode.dao.entity.AttemptEntity;

public record AttemptDto(
    Integer x,
    Double y,
    Integer r,
    Boolean hit
) {

    public static AttemptDto build(AttemptEntity attempt) {
        if (attempt == null)
            return null;

        return new AttemptDto(
            attempt.getX(),
            attempt.getY(),
            attempt.getR(),
            attempt.getHit()
        );
    }

    public static AttemptDto build(PointDto point, Boolean hitResult) {
        if (point == null || hitResult == null)
            return null;

        return new AttemptDto(
            point.x(),
            point.y(),
            point.r(),
            hitResult
        );
    }

}
