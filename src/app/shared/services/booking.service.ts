import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking } from '../../interfaces/booking.interface';
import { TravelConfirmationStatus } from '../../enum/travelConfirmation.enum';
import { FormGroup } from '@angular/forms';
import { IAgencyBookingData } from '../../interfaces/agencyBookingsData.interface';
import { IPackage } from '../../interfaces/package.interface';
import { environment } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly _BASE_URL = environment.apiUrl;
  private _api = this._BASE_URL;
  constructor(private _http: HttpClient) {}

  createPayment(packageId: string | undefined, couponId: string) {
    return this._http.post<{
      success: boolean;
      amount: number;
      currency: string;
      id: string;
      key_id: string;
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
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      booked: IBooking[];
      totalItems: number;
      currentPage: number;
    }>(`${this._api}/booking/getAllBooked`, { params, withCredentials: true });
  }

  getTravelHistoryOfUser(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      history: IBooking[];
      totalItems: number;
      currentPage: number;
    }>(`${this._api}/booking/travelHistory`, { params, withCredentials: true });
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

  createFeedbackForAgency(
    agencyId: string,
    feedback: {
      rating: number;
      review: string;
    }
  ) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/rating-review-agency/${agencyId}`,
      feedback,
      { withCredentials: true }
    );
  }

  createFeedbackForPackage(
    packageId: IPackage,
    feedback: {
      rating: number;
      review: string;
    }
  ) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/rating-review-package/${packageId}`,
      feedback,
      { withCredentials: true }
    );
  }

  isUserHaveFeedBackOnAgency(agencyId: string) {
    return this._http.get<{ success: boolean; rating: number; review: string }>(
      `${this._api}/rating-review-agency/isExisting/${agencyId}`,
      {
        withCredentials: true,
      }
    );
  }

  isUserHaveFeedBackOnPackge(packageId: IPackage) {
    return this._http.get<{ success: boolean; rating: number; review: string }>(
      `${this._api}/rating-review-package/isExisting/${packageId}`,
      {
        withCredentials: true,
      }
    );
  }

  changeStatus(bookingId: string, status: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/booking/changestatus/${bookingId}`,
      {
        status,
      },
      { withCredentials: true }
    );
  }
}
