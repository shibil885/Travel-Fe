import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgency } from '../../../../models/agency.model';
import { IPackage } from '../../../../interfaces/package.interface';
import { tap } from 'rxjs';
import { AgencyFilter } from '../../../../enum/agency-filter.enum';
import { PackageFilter } from '../../../../enum/package-filter.enum';
import { IBooking } from '../../../../interfaces/booking.interface';
import { BookingTrend } from '../../../../interfaces/bookingTrend.interface';
import { environment } from '../../../../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private readonly _BASE_URL = environment.apiUrl;
  private _api = this._BASE_URL;
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

  topAgency(filter: AgencyFilter) {
    const params = new HttpParams().set('query', filter);
    return this._http.get<{
      success: boolean;
      message: string;
      agencies: IAgency[];
    }>(`${this._api}/admin-dashboard/topAgencies`, {
      params,
      withCredentials: true,
    });
  }

  topPackages(filter: PackageFilter) {
    console.log('filter from service', filter);
    const params = new HttpParams().set('query', filter);
    return this._http.get<{
      success: boolean;
      message: string;
      packages: IPackage[];
    }>(`${this._api}/admin-dashboard/topPackages`, {
      params,
      withCredentials: true,
    });
  }

  generateReport(start_date: Date, end_date: Date) {
    const params = new URLSearchParams({
      start_date: start_date.toISOString(),
      end_date: end_date.toISOString(),
    }).toString();

    return this._http.get<{
      success: boolean;
      message: string;
      report: IBooking[];
    }>(`${this._api}/admin-dashboard/generateReport?${params}`, {
      withCredentials: true,
    });
  }
  getBookingTrends(groupBy: 'month' | 'year') {
    const params = new HttpParams().set('groupBy', groupBy);
    return this._http
      .get<{
        success: boolean;
        message: string;
        data: BookingTrend[];
      }>(`${this._api}/admin-dashboard/booking-trends`, {
        params,
        withCredentials: true,
      })
      .pipe(tap((res) => console.log('data to the graph -->', res)));
  }
}
