import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking } from '../../interfaces/booking.interface';
import { TravelConfirmationStatus } from '../../enum/travelConfirmation.enum';
import { FormGroup } from '@angular/forms';
import { IAgencyBookingData } from '../../interfaces/agencyBookingsData.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private _api = 'http://localhost:3000';
  constructor(private _http: HttpClient) {}

  createPayment(packageId: string | undefined, couponId: string) {
    return this._http.post<{
      success: boolean;
      amount: number;
      currency: string;
      id: string;
    }>(
      `${this._api}/payment/create-order/`,
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
    bookingData: FormGroup
  ) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/payment/verify`,
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
  getAllBookedPackages(page: number, limit: number) {
    console.log('page', page);
    console.log('page', limit);
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      booked: IBooking[];
      totalItems: number;
      currentPage: number;
    }>(`${this._api}/booking/getAllBooked`, { params, withCredentials: true });
  }

  getSingleBookedPackage(id: string) {
    return this._http.get<{ success: boolean; bookedPackage: IBooking }>(
      `${this._api}/booking/getSingleBookedPackage/${id}`,
      { withCredentials: true }
    );
  }

  getAllBookedPackagesForAgency(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      booking: IBooking[];
      totalItems: number;
      currentPage: number;
    }>(`${this._api}/booking/getAllBookingsForAgency`, {
      params,
      withCredentials: true,
    });
  }
  confirmBooking(bookingId: string, status: TravelConfirmationStatus) {
    console.log(status);
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/booking/confirmBooking/${bookingId}`,
      { status },
      { withCredentials: true }
    );
  }

  cancelBooking(bookingId: string | undefined, user: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/booking/cancelBooking/${bookingId}`,
      { user },
      { withCredentials: true }
    );
  }

  getBookingsByAgencies(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      message: string;
      data: IAgencyBookingData[];
      totalItems: number;
      currentPage: number;
    }>(`${this._api}/booking/byAgencies`, { params, withCredentials: true });
  }

  getCompletedBookings(agencyId: string, page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      bookings: IBooking[];
      totalItems: number;
      page: number;
    }>(`${this._api}/booking/completed/${agencyId}`, {
      params,
      withCredentials: true,
    });
  }
  getPendingBookings(agencyId: string, page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      bookings: IBooking[];
      totalItems: number;
      page: number;
    }>(`${this._api}/booking/pending/${agencyId}`, {
      params,
      withCredentials: true,
    });
  }
  getStartedBookings(agencyId: string, page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      bookings: IBooking[];
      totalItems: number;
      page: number;
    }>(`${this._api}/booking/started/${agencyId}`, {
      params,
      withCredentials: true,
    });
  }
  getCancelledBookings(agencyId: string, page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      bookings: IBooking[];
      totalItems: number;
      page: number;
    }>(`${this._api}/booking/cancelled/${agencyId}`, {
      params,
      withCredentials: true,
    });
  }
}
