import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { StorageService } from '../../../auth/components/services/storage/storage.service'
import { BookACarDto } from '../../../shared/book-a-car.dto';
import { environment } from '../../../../environment';


const BASIC_URL = 'http://localhost:8080'

export interface BookingResponse {
  id: number;        
}

@Injectable({
  providedIn: 'root'
})


export class CustomerService {
  
  private readonly base = `${BASIC_URL}/api/customer`;
  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/cars`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/car/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

 bookACar(dto: BookACarDto): Observable<BookingResponse> {
  return this.http.post<BookingResponse>(
    `${this.base}/car/book`,
    dto,
    { headers: this.createAuthorizationHeader() }   //  ⚠️ adaugă header-ul
  );
}

  getBookingsByUserId(): Observable<any> {
    const userId = StorageService.getUserId()
      ? Number(StorageService.getUserId())
      : 0

    return this.http.get(`${BASIC_URL}/api/customer/car/bookings/${userId}`, {
      headers: this.createAuthorizationHeader()
    })
  }
  searchKeyword(keyword: string) {
  return this.http.get<any[]>(`${environment.apiBase}/customer/cars/search/keyword`, {
    params: { q: keyword }
  });
}

searchCar(dto: any) {
  return this.http.post<any>(`${environment.apiBase}/customer/cars/search`, dto);
}

  private createAuthorizationHeader(): HttpHeaders {
    const authHeaders: HttpHeaders = new HttpHeaders()

    return authHeaders.set(
      'Authorization',
      `Bearer ${StorageService.getToken()}`
    )
  }
}
