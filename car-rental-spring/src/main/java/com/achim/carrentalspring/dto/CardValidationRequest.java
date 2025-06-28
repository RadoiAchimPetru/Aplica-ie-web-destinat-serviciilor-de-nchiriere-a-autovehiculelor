package com.achim.carrentalspring.dto;

public record CardValidationRequest(
        String cardNumber,
        int expMonth,
        int expYear,
        String cvc
) {}