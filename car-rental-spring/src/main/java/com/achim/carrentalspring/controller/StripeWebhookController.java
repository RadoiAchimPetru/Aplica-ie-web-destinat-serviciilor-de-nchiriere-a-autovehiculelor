package com.achim.carrentalspring.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/stripe/webhook")
public class StripeWebhookController {

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    public ResponseEntity<String> onEvent(HttpServletRequest request) throws IOException {
        String payload = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        String sigHeader = request.getHeader("Stripe-Signature");

        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("");
        }

        if ("setup_intent.succeeded".equals(event.getType())) {
            var setupIntent = (com.stripe.model.SetupIntent) event.getDataObjectDeserializer()
                    .getObject().orElse(null);

            String paymentMethod = setupIntent.getPaymentMethod();
            String customerId   = setupIntent.getCustomer(); // dacă ai creat customer

            // TODO: setează în DB cardValid=true pentru rezervarea pending
            // de ex. bookingRepository.markCardValid(setupIntent.getMetadata().get("bookingId"));
        }

        return ResponseEntity.ok("");
    }
}
