package com.enzulode.service;

import com.enzulode.dto.AttemptDto;
import com.enzulode.dto.PointDto;
import java.util.List;

public interface AttemptService {
    AttemptDto newAttempt(PointDto point);
    List<AttemptDto> fetchAttempts(Integer pageSize, Integer page);
    void clearAttempts();
    List<AttemptDto> fetchAll();
}
