package com.enzulode.check;

import com.enzulode.dto.PointDto;

public interface PointHitChecker {

    boolean check(PointDto point);

    boolean checkWithRadius(PointDto point, Integer radius);

}
