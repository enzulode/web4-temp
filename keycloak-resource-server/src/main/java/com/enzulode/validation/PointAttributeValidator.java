package com.enzulode.validation;

public interface PointAttributeValidator<T> {

    boolean validate(T target);

    String getErrorMessage();

}
