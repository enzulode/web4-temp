package com.enzulode.controller.error;

import com.enzulode.dto.MessageDto;
import com.enzulode.exception.AttemptValidationException;
import com.enzulode.exception.EntityCreationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerErrorHandler {

    @ExceptionHandler({ EntityCreationException.class })
    public ResponseEntity<MessageDto> entityCreationFailure(Throwable cause) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new MessageDto("creation failed: " + cause.getMessage()));
    }

    @ExceptionHandler({ AttemptValidationException.class })
    public ResponseEntity<MessageDto> validationFailure(Throwable cause) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(new MessageDto(cause.getMessage()));
    }

}
