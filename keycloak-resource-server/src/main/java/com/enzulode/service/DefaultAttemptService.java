package com.enzulode.service;

import com.enzulode.check.PointHitChecker;
import com.enzulode.dao.entity.AttemptEntity;
import com.enzulode.dao.repository.AttemptRepository;
import com.enzulode.dto.AttemptDto;
import com.enzulode.dto.PointDto;
import com.enzulode.exception.AttemptValidationException;
import com.enzulode.validation.PointAttributeValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DefaultAttemptService implements AttemptService {


    private final List<PointAttributeValidator<PointDto>> attributeValidators;
    private final PointHitChecker hitChecker;
    private final AttemptRepository attemptRepository;

    @Override
    @Transactional
    public AttemptDto newAttempt(PointDto point) {
        if (point == null)
            throw new AttemptValidationException("Point should be provided");

        for (PointAttributeValidator<PointDto> validator : attributeValidators) {
            if (!validator.validate(point))
                throw new AttemptValidationException(validator.getErrorMessage());
        }

        AttemptEntity attempt = AttemptEntity.build(
            point,
            hitChecker.check(point)
        );
        return AttemptDto.build(attemptRepository.save(attempt));
    }

    @Override
    @Transactional
    public List<AttemptDto> fetchAttempts(Integer pageSize, Integer page) {
        if (pageSize == null || page == null)
            return Collections.emptyList();

        return attemptRepository
                .findAllByCreatedBy(findPrincipalName(), PageRequest.of(page, pageSize))
                .stream()
                .map(
                        attempt -> new AttemptDto(
                            attempt.getX(),
                            attempt.getY(),
                            attempt.getR(),
                            attempt.getHit()
                        )
                )
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void clearAttempts() {
        attemptRepository.deleteAllByCreatedBy(findPrincipalName());
    }


    @Override
    @Transactional
    public List<AttemptDto> fetchAll() {
        return attemptRepository.findAllByCreatedBy(findPrincipalName()).stream()
            .map(AttemptDto::build)
            .collect(Collectors.toList());
    }

    private String findPrincipalName() {
        Principal user = SecurityContextHolder.getContext().getAuthentication();
        if (user == null)
            return "";

        return user.getName() == null ? "" : user.getName();
    }
}
