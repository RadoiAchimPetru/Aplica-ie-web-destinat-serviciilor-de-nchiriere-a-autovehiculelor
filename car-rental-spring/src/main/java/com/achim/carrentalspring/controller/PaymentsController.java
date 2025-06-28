package com.achim.carrentalspring.controller;

import com.achim.carrentalspring.dto.PayBookingDto;
import com.achim.carrentalspring.dto.ValidateCardDto;
import com.achim.carrentalspring.repository.BookACarRepository;
import com.achim.carrentalspring.repository.UserRepository;
import com.achim.carrentalspring.services.payment.PaymentService;
import com.achim.carrentalspring.utils.LuhnValidator;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins="http://localhost:4200")
public class PaymentsController {
    private final PaymentService paymentService;
    private final BookACarRepository bookingRepo;
    private final LuhnValidator luhn;
    private final UserRepository userRepo;

    public PaymentsController(PaymentService paymentService,
                              BookACarRepository bookingRepo,
                              LuhnValidator luhn,
                              UserRepository userRepo) {
        this.paymentService = paymentService;
        this.bookingRepo    = bookingRepo;
        this.luhn           = luhn;
        this.userRepo       = userRepo;
    }

    // 1️⃣ Setup Intent
    @PostMapping("/validate-card")
    public Map<String,String> validate(@RequestBody Map<String,Long> body) throws StripeException {
        Long bookingId   = body.get("bookingId");
        var booking      = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        String custId    = booking.getUser().getStripeCustomerId();

        String clientSecret = paymentService.createSetupIntentForCustomer(custId);
        return Map.of("clientSecret", clientSecret);
    }


    @PostMapping("/pay-booking")
    public Map<String,String> pay(@RequestBody PayBookingDto dto) throws StripeException {
        var booking = bookingRepo.findById(dto.bookingId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        String secret = paymentService.createPaymentIntent(
                booking.getPriceCents(),
                dto.paymentMethodId(),
                booking.getUser().getStripeCustomerId()
        );
        booking.markAsPaid(); bookingRepo.save(booking);
        return Map.of("clientSecret", secret);
    }

    // 3️⃣ Payment Link
    @PostMapping("/link")
    public Map<String,String> link(@RequestBody Map<String,Long> body) throws StripeException {
        Long bookingId = body.get("bookingId");
        var booking    = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String url = paymentService.createPaymentLink(booking.getPriceCents());
        return Map.of("url", url);
    }
}



