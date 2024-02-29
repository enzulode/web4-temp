package com.enzulode.controller;

import com.enzulode.dto.AttemptDto;
import com.enzulode.dto.PointDto;
import com.enzulode.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/api/v1/point")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8888"})
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class PointController {

    private final PointService pointService;

    @PostMapping("/recalc")
    public ResponseEntity<List<AttemptDto>> recalculatePoints(@RequestBody List<PointDto> pointDtos, @RequestParam Integer newRadius) {
        return ResponseEntity.ok(pointService.recalculatePoints(pointDtos, newRadius));
    }

}
