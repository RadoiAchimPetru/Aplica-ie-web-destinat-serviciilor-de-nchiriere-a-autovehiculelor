package com.achim.carrentalspring.dto;

import lombok.Data;

@Data
public class ValidateCardDto {
    private String cardNumber;
    private int    expMonth;
    private int    expYear;
    private String cvc;

}
