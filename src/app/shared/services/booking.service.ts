import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking } from '../../interfaces/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private api = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  createPayment(packageId: string | undefined, couponId: string) {
    return this.http.post(
      `${this.api}/payment/create-order/`,
      { packageId, couponId },
      { withCredentials: true }
    );
  }

  verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    packageId: string | undefined,
    agencyId: string,
    couponId: string,
    bookingData: any
  ) {
    return this.http.post<{ success: string; message: string }>(
      `${this.api}/payment/verify`,
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        packageId,
        agencyId,
        couponId,
        bookingData,
      },
      { withCredentials: true }
    );
  }
  getAllBookedPackages() {
    return this.http.get<{ success: boolean; booked: IBooking[] }>(
      `${this.api}/booking/getAllBooked`,
      {
        withCredentials: true,
      }
    );
  }

  getSingleBookedPackage(id: string) {
    return this.http.get<{ success: boolean; bookedPackage: IBooking }>(
      `${this.api}/booking/getSingleBookedPackage/${id}`,
      { withCredentials: true }
    );
  }

  getAllBookedPackagesForAgency(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<{
      success: boolean;
      booking: IBooking[];
      totalItems: number;
      currentPage: number;
    }>(`${this.api}/booking/getAllBookingsForAgency`, {
      params,
      withCredentials: true,
    });
  }
  confirmBooking(bookingId: string, status: boolean) {
    return this.http.patch<{ success: boolean; message: string }>(
      `${this.api}/booking/confirmBooking/${bookingId}`,
      { status },
      { withCredentials: true }
    );
  }
}
