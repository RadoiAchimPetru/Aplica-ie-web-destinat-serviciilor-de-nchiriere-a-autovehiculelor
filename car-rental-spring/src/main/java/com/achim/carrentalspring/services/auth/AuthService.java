package com.achim.carrentalspring.services.auth;

import com.achim.carrentalspring.dto.SignupRequest;
import com.achim.carrentalspring.dto.UserDto;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
