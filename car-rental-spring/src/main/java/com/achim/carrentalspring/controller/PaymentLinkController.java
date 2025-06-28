/*package com.achim.carrentalspring.controller;

import com.achim.carrentalspring.services.payment.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentLinkController {

    private final PaymentService paymentService;

    public record LinkRequest(String priceId) {}

    public PaymentLinkController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/link")
    public Map<String,String> createLink(@RequestBody LinkRequest dto) throws StripeException {
        String url = paymentService.createPaymentLink(dto.priceId());
        return Map.of("url", url);
    }
}*/
