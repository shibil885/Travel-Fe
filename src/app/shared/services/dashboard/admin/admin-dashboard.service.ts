import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgency } from '../../../../models/agency.model';
import { IPackage } from '../../../../interfaces/package.interface';
import { tap } from 'rxjs';
import { AgencyFilter } from '../../../../enum/agency-filter.enum';
import { PackageFilter } from '../../../../enum/package-filter.enum';

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
}
