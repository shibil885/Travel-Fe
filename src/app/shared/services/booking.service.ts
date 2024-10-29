import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private api = 'http://localhost:3000/payment';
  constructor(private http: HttpClient) {}

  createPayment(packageId: string | undefined, couponId: string) {
    return this.http.post(
      `${this.api}/create-order`,
      { packageId, couponId },
      { withCredentials: true }
    );
  }

  verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    packageId: string | undefined,
    couponId: string,
    bookingData: any
  ) { 
    return this.http.post(
      `${this.api}/verify`,
      { razorpay_order_id,razorpay_payment_id,razorpay_signature,packageId, couponId ,bookingData},
      { withCredentials: true }
    );
  }
}
