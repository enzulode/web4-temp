package com.enzulode.controller;

import com.enzulode.dto.AttemptDto;
import com.enzulode.dto.PointDto;
import com.enzulode.service.AttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/v1/attempt")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8888"})
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;

    @PostMapping("/new")
    public ResponseEntity<AttemptDto> newAttempt(@RequestBody PointDto pointDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(attemptService.newAttempt(pointDto));
    }

    @GetMapping("/fetch")
    public ResponseEntity<List<AttemptDto>> fetchPaginated(
        @RequestParam Integer pageSize,
        @RequestParam Integer page
    ) {
        return ResponseEntity.ok(attemptService.fetchAttempts(pageSize, page));
    }

    @DeleteMapping
    public void clearAttempts() {
        attemptService.clearAttempts();
    }

    @GetMapping("/all")
    public ResponseEntity<List<AttemptDto>> fetchAll() {
        return ResponseEntity.ok(attemptService.fetchAll());
    }
}
