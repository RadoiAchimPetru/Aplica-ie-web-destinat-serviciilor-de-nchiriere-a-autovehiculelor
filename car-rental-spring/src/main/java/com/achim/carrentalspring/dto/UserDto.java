package com.achim.carrentalspring.dto;

import com.achim.carrentalspring.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private UserRole userRole;
}
