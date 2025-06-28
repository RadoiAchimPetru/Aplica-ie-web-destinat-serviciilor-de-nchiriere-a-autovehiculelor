import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeCardElementOptions } from '@stripe/stripe-js';



@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent {

  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
  @Output() cardValidated = new EventEmitter<string>();      // → paymentMethodId

  loading = false;

  /** opțiuni vizuale Stripe Elements */
  cardOptions: StripeCardElementOptions = { hidePostalCode: true };

  /** model minim trimis la /validate-card pentru testul Luhn */
  model = { cardNumber: '', expMonth: 0, expYear: 0, cvc: '' };

  constructor(private http: HttpClient, private stripe: StripeService) {}

  validateCard(): void {
  if (this.loading) { return; }
  this.loading = true;

  /* 🔹 eliminăm spaţiile din numărul introdus */
  const body = {
    ...this.model,
    cardNumber: this.model.cardNumber.replace(/\s+/g, '')
  };

  this.http.post<{ clientSecret: string }>(
    `${environment.apiBase}/payments/validate-card`,
    body
  ).subscribe({
    next: ({ clientSecret }) => {
      /* confirmăm SetupIntent în browser */
      this.stripe.confirmCardSetup(clientSecret, {
        payment_method: { card: this.cardElement.element }
      }).subscribe(res => {
        this.loading = false;
        if (res.setupIntent?.status === 'succeeded') {
          this.cardValidated.emit(res.setupIntent.payment_method as string);
        } else {
          alert('Cardul a fost respins sau necesită acţiune suplimentară.');
        }
      });
    },
    error: () => {
      this.loading = false;
      alert('Număr de card invalid (Luhn) sau eroare server.');
    }
  });
}

}
