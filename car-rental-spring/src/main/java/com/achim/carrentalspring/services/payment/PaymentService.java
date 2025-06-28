package com.achim.carrentalspring.services.payment;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentLink;
import com.stripe.model.Price;
import com.stripe.model.SetupIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentLinkCreateParams;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.SetupIntentCreateParams;
import org.springframework.stereotype.Service;


@Service
public class PaymentService {
    public String createSetupIntent() throws StripeException {
        return SetupIntent.create(
                SetupIntentCreateParams.builder()
                        .addPaymentMethodType("card").build()
        ).getClientSecret();
    }


    public String createSetupIntentForCustomer(String customerId) throws StripeException {
        SetupIntentCreateParams params = SetupIntentCreateParams.builder()
                .addPaymentMethodType("card")
                .setCustomer(customerId)
                // dacă vrei s-o folosești off_session mai târziu:
                .setUsage(SetupIntentCreateParams.Usage.OFF_SESSION)
                .build();
        return SetupIntent.create(params).getClientSecret();
    }


    public String createPaymentLink(long amountCents) throws StripeException {
        // 1️⃣ create a one-off Price
        Price price = Price.create(
                PriceCreateParams.builder()
                        .setCurrency("eur")
                        .setUnitAmount(amountCents)
                        .setProductData(
                                PriceCreateParams.ProductData.builder()
                                        .setName("Închiriere mașină")
                                        .build()
                        )
                        .build()
        );

        // 2️⃣ build a link from that Price
        PaymentLink link = PaymentLink.create(
                PaymentLinkCreateParams.builder()
                        .addLineItem(
                                PaymentLinkCreateParams.LineItem.builder()
                                        .setPrice(price.getId())
                                        .setQuantity(1L)
                                        .build()
                        )
                        .build()
        );
        return link.getUrl();
    }
    public String createPaymentIntent(long amount, String paymentMethodId, String customerId) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency("eur")
                .setCustomer(customerId)
                .setPaymentMethod(paymentMethodId)
                .setConfirm(true)
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        return intent.getClientSecret();
    }

}

