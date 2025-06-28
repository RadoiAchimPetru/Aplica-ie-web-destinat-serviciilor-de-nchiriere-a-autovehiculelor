import { Component, OnInit } from '@angular/core'
import { CustomerService } from '../../services/customer.service'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from '../../../../auth/components/services/storage/storage.service'
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent implements OnInit {
  constructor(private service: CustomerService) {}

  bookings: any[] = []
  isSpinning = false

  ngOnInit() {
    this.getBookingsByUserId()
  }

  private getBookingsByUserId() {
  this.isSpinning = true;

 this.service.getBookingsByUserId().pipe(
  finalize(() => this.isSpinning = false)
).subscribe({
  next: data => {
    this.bookings = data.map((b: any) => ({
      // dacă API-ul returnează sub alta cheie, adaptează aici
      car: b.car,               
      fromDate: new Date(b.fromDate),
      toDate:   new Date(b.toDate),
      bookCarStatus: b.bookCarStatus
    }));
  },
  error: err => {
    console.error(err);
  }
});
}}