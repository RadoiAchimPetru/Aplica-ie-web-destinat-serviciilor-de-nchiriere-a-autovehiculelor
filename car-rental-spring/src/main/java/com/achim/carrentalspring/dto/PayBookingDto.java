package com.achim.carrentalspring.dto;

public record PayBookingDto(
        Long bookingId,
        String paymentMethodId,
        Double returnLat,
        Double returnLng) {}
