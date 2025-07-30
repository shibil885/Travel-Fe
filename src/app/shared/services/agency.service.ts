import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IAgency } from '../../models/agency.model';
import { environment } from '../../../Environment/environment';
import { ApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private readonly _BASE_URL = environment.apiUrl;
  private _api = this._BASE_URL;
  constructor(private _http: HttpClient) {}

  findEmail(email: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');

    return this._http.post<ApiResponse<{ isExisting: boolean }>>(
      `${this._api}/agency/check-email`,
      {
        email,
      },
      { withCredentials: true, headers }
    );
  }
  findName(name: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.post<ApiResponse<{ isExisting: boolean }>>(
      `${this._api}/agency/check-name`,
      {
        name,
      },
      { withCredentials: true, headers }
    );
  }
  isConfirmed() {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http
      .get<ApiResponse<{ isConfirmed: boolean }>>(
        `${this._api}/agency/confirmation-status`,
        {
          withCredentials: true,
          headers,
        }
      )
      .pipe(
        map((data) => {
          return data.data?.isConfirmed;
        })
      );
  }
  registerAgency(formData: FormData) {
    return this._http.post<ApiResponse<{ agency: IAgency }>>(
      `${this._api}/agency`,
      formData,
      { withCredentials: true }
    );
  }
  verifyOtp(formData: { otp: string; email: string | null | undefined }) {
    return this._http.post<ApiResponse<IAgency>>(
      `${this._api}/otp/verify/agency`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
  resendOtp(formData: { email: string | null | undefined }) {
    return this._http.post<ApiResponse<{ agency: IAgency }>>(
      `${this._api}/otp/resend`,
      formData,
      { withCredentials: true }
    );
  }
}
