package com.achim.carrentalspring.dto;

import com.achim.carrentalspring.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private UserRole userRole;
    private Long userId;
}
