import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private api = 'http://localhost:3000/payment';
  constructor(private http: HttpClient) {}

  createPayment() {
    return this.http.post(
      `${this.api}/create-order`,
      { amount: 1000 },
      { withCredentials: true }
    );
  }
}
    