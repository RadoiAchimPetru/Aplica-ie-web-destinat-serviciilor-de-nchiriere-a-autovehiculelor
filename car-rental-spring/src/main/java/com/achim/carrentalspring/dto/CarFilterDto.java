package com.achim.carrentalspring.dto;

public record CarFilterDto(
        String brand,
        String type,
        String transmission,
        String color
) {}
