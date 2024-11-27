import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking } from '../../../../interfaces/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class AgencyDashboardService {
  private readonly _api = 'http://localhost:3000/agency-dashboard';
  constructor(private readonly _http: HttpClient) {}

  getRecentBookings() {
    return this._http.get<{
      success: boolean;
      message: string;
      bookings: IBooking[];
    }>(`${this._api}/recentBookings`, {
      withCredentials: true,
    });
  }
}
