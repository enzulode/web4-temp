package com.enzulode.exception;

public class AttemptValidationException extends RuntimeException {

    public AttemptValidationException(String message) {
        super(message);
    }

    public AttemptValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
