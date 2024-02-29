package com.enzulode.validation;

import com.enzulode.dto.PointDto;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class RadiusAttributeValidatorImpl implements PointAttributeValidator<PointDto> {

    private static final List<Integer> ALLOWED_VALUES = List.of(-3, -2, -1, 0, 1, 2, 3, 4, 5);

	@Override
    public boolean validate(PointDto target) {
        if (target.r() == null)
            return false;

        return ALLOWED_VALUES.contains(target.r());
    }

    @Override
    public String getErrorMessage() {
	    return "Radius is invalid";
    }
}
