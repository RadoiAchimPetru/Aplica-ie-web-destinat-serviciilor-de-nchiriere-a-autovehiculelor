import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router }        from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService }                from 'ngx-stripe';
import { StripeCardComponent }          from 'ngx-stripe';
import { StripeCardElementOptions }     from '@stripe/stripe-js';
import { NzMessageService }             from 'ng-zorro-antd/message';
import { finalize, switchMap, throwError } from 'rxjs';

import { BookingResponse, CustomerService } from '../../services/customer.service';
import { PaymentService }                  from '../../services/payment.service';
import { StorageService }                  from '../../../../auth/components/services/storage/storage.service';
import { differenceInCalendarDays } from 'date-fns';
import * as L from "leaflet";

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.scss']
})
export class BookCarComponent implements OnInit {
intentClientSecret: string | null = null;
  center: google.maps.LatLngLiteral = { lat: 45.7489, lng: 21.2087 };
  zoom = 13;
paymentElementOptions = {
  clientSecret: this.intentClientSecret,
  appearance: { theme: 'stripe' }
};
elementsOptions = { wallets: { link: 'auto' } };


  @ViewChild('cardElem') cardElem!: StripeCardComponent;
 
  totalPrice: number = 0;
  validateForm!: FormGroup;
  loading = false;
  car: any;
  carId = +this.route.snapshot.params['id'];
  pickedLat!: number;
  pickedLng!: number;
  coordLocked = false;
  paymentMethod: 'link' | 'card' = 'link';
  
  

  // opțiuni Stripe Card
  cardOptions: StripeCardElementOptions = { hidePostalCode: true };
  elementsOpts: any = { wallets: { link: 'never' } };

  constructor(
    private fb:      FormBuilder,
    private customer: CustomerService,
    private payment:  PaymentService,
    private stripe:   StripeService,
    private msg:      NzMessageService,
    private router:   Router,
    private route:    ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate:   [null, Validators.required]
    });
    this.customer.getCarById(this.carId)
      .subscribe(car => {
        this.car = car;
        this.car.processedImage = `data:image/jpeg;base64,${car.returnedImage}`;
      });
       this.validateForm.valueChanges.subscribe(({ fromDate, toDate }) => {
      if (fromDate && toDate && this.car) {
        const days = differenceInCalendarDays(toDate, fromDate) + 1;
        this.totalPrice = days * this.car.price;
      } else {
        this.totalPrice = 0;
      }
    });
    
    
  }

  onLocPicked(pos: { lat: number; lng: number }): void {
    this.pickedLat   = pos.lat;
    this.pickedLng   = pos.lng;
    this.coordLocked = true;
  }

  confirmBooking(): void {
  if (this.validateForm.invalid) {
    this.msg.warning('Completează perioada de închiriere!');
    return;
  }
  if (!this.coordLocked) {
    this.msg.warning('Alege locul de predare pe hartă!');
    return;
  }

  this.loading = true;
  const { fromDate, toDate } = this.validateForm.value;

  // 1️⃣ Creăm booking-ul în stare PENDING
  this.customer.bookACar({
    carId:  this.carId,
    userId: StorageService.getUserId(),
    fromDate,
    toDate
  }).pipe(
    switchMap((resp: BookingResponse) => {
      const bookingId = resp.id;

      if (this.paymentMethod === 'link') {
        // 2a️⃣ Fluxul Link: trimitem doar bookingId
        return this.payment.createLink(bookingId);
      } else {
        // 2b️⃣ Fluxul Card: setupIntent → confirmSetup → payBooking → confirmPayment
        return this.payment.validateCard(bookingId).pipe(
          switchMap(({ clientSecret }) =>
            this.stripe.confirmCardSetup(clientSecret, {
              payment_method: { card: this.cardElem.element }
            })
          ),
          switchMap(setupRes => {
            if (setupRes.setupIntent?.status !== 'succeeded') {
              return throwError(() => new Error('SetupIntent a eșuat'));
            }
            const pmId = setupRes.setupIntent.payment_method as string;
            return this.payment.payBooking({
              bookingId:       bookingId,
              paymentMethodId: pmId,
              returnLat:       this.pickedLat,
              returnLng:       this.pickedLng
            });
          }),
          switchMap(({ clientSecret }) =>
            this.stripe.confirmCardPayment(clientSecret)
          )
        );
      }
    }),
    finalize(() => this.loading = false)
  )
  .subscribe({
    next: result => {
      if (this.paymentMethod === 'link') {
        // result are forma { url: string }
        window.open((result as any).url, '_blank');
      } else {
        // result este PaymentIntentResult
        if ((result as any).paymentIntent?.status === 'succeeded') {
          this.msg.success('Plata cu cardul a fost efectuată!');
          this.router.navigateByUrl('/customer/my-bookings');
        } else {
          this.msg.error('Plata a eșuat.');
        }
      }
    },
    error: err => {
      this.msg.error(err.message || 'Eroare la procesarea plății.');
    }
  });
}

  private getCarById(): void {
  this.customer.getCarById(this.carId)
    .subscribe(res => {
      this.car = res;
      
      this.car.processedImage = `data:image/jpeg;base64,${res.returnedImage}`;
    });
}

}
  



  


