package com.enzulode.service;

import com.enzulode.check.PointHitChecker;
import com.enzulode.dto.AttemptDto;
import com.enzulode.dto.PointDto;
import com.enzulode.validation.PointAttributeValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DefaultPointService implements PointService {

    private final List<PointAttributeValidator<PointDto>> attributeValidators;
    private final PointHitChecker hitChecker;

    @Override
    public List<AttemptDto> recalculatePoints(List<PointDto> points, Integer newRadius) {
        if (points == null || newRadius == null)
            return Collections.emptyList();

        List<AttemptDto> recalculatedPoints = new ArrayList<>();
        for (PointDto point : points) {
            boolean isValid = attributeValidators.stream()
                .map(validator -> validator.validate(point))
                .filter(nvp -> nvp.equals(false))
                .findFirst()
                .isEmpty();

            if (isValid) {
                boolean recalculationResult = hitChecker.checkWithRadius(point, newRadius);
                recalculatedPoints.add(AttemptDto.build(point, recalculationResult));
            }
        }

        return recalculatedPoints;
    }
}
