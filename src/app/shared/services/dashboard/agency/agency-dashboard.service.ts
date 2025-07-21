import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking } from '../../../../interfaces/booking.interface';
import { environment } from '../../../../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AgencyDashboardService {
  private readonly _BASE_URL = environment.apiUrl;
  private readonly _api = `${this._BASE_URL}/agency-dashboard`;
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

  getCurrentTravellings() {
    return this._http.get<{
      success: boolean;
      message: string;
      bookings: IBooking[];
    }>(`${this._api}/currentTravellings`, {
      withCredentials: true,
    });
  }

  getStatsdata() {
    return this._http.get<{
      success: boolean;
      message: string;
      packagesCount: string;
      totalBookings: string;
      totalRevenue: string;
    }>(`${this._api}/statsData`, {
      withCredentials: true,
    });
  }
}
