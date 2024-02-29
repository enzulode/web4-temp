package com.enzulode.service;

import com.enzulode.dto.AttemptDto;
import com.enzulode.dto.PointDto;
import java.util.List;

public interface PointService {

    List<AttemptDto> recalculatePoints(List<PointDto> points, Integer newRadius);
}
