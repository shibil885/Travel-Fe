import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private _api = 'http://localhost:3000';
  constructor(private _http: HttpClient) {}

  statasCard() {
    return this._http.get<{
      success: boolean;
      message: string;
      result: {
        users: number;
        agencies: number;
        packages: number;
        bookings: number;
      };
    }>(`${this._api}/admin-dashboard/statasCard`, {
      withCredentials: true,
    });
  }

  revenue() {
    return this._http.get<{
      success: boolean;
      message: string;
      result: number;
    }>(`${this._api}/admin-dashboard/revenue`, {
      withCredentials: true,
    });
  }
}
