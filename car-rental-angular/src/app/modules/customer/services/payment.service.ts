import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PayBookingDto }   from '../../../shared/pay-booking.dto';
import { environment } from '../../../../environment';
import { StorageService } from '../../../auth/components/services/storage/storage.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private base = `${environment.apiBase}/payments`;

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${StorageService.getToken()}`
    });
  }

  constructor(private http: HttpClient) {}

  validateCard(bookingId: number) {
    return this.http.post<{clientSecret: string}>(
      `${this.base}/validate-card`, {bookingId}
    );
  }

  payBooking(dto: PayBookingDto) {
    return this.http.post<{clientSecret: string}>(
      `${this.base}/pay-booking`,
      dto,
      { headers: this.authHeaders() }    // <— asta e crucial
    );
  }

  createLink(bookingId: number) {
  return this.http.post<{ url: string }>(
    `${this.base}/link`,
    { bookingId },
    { headers: this.authHeaders() }
  );
}

}
