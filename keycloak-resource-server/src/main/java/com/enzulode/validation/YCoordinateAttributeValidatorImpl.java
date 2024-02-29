package com.enzulode.validation;

import com.enzulode.dto.PointDto;
import org.springframework.stereotype.Component;

@Component
public class YCoordinateAttributeValidatorImpl implements PointAttributeValidator<PointDto> {


    @Override
    public boolean validate(PointDto target) {
        if (target.y() == null)
            return false;

        return Double.compare(target.y(), -3D) > 0 && Double.compare(target.y(), 3D) < 0;
    }

    @Override
    public String getErrorMessage() {
        return "Point Y coordinate is invalid";
    }
}
