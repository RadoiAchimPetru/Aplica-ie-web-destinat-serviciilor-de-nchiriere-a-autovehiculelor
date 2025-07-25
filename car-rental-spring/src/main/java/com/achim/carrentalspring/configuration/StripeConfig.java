package com.achim.carrentalspring.configuration;

import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;


@Configuration
public class StripeConfig {

    @Value("${stripe.secret-key}")
    private String secretKey;

    @PostConstruct
    void init() {
        Stripe.apiKey = secretKey; // setare globală Stripe SDK
    }
}