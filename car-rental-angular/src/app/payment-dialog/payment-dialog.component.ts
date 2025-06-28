import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StripeService } from 'ngx-stripe';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { environment } from '../../environment';   

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent {
  @Input() bookingId!: number;
  @Input() amountCents!: number;

  paymentMethodId?: string;
  loading = false;

  constructor(private stripe: StripeService,
              private http: HttpClient,
              private modal: NzModalRef) {}

  onCardValidated(pm: string) { this.paymentMethodId = pm; }

  pay() {
    if (!this.paymentMethodId) { return; }
    this.loading = true;

    this.http.post<{clientSecret:string}>('/api/payments/pay-booking', {
      bookingId: this.bookingId,
      paymentMethodId: this.paymentMethodId
    }).subscribe(({clientSecret}) => {
      this.stripe.confirmCardPayment(clientSecret).subscribe(({paymentIntent}) => {
        this.loading = false;
        this.modal.close(paymentIntent?.status === 'succeeded');
      });
    }, () => this.loading = false);
  }
}
