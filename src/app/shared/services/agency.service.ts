import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IAgency } from '../../models/agency.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/service.service';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private _api = 'http://localhost:3000';
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _router: Router
  ) {}

  findEmail(email: string) {
    return this._http
      .post<{ isExisting: boolean }>(
        `${this._api}/agency/isExistingMail`,
        {
          email,
        },
        { withCredentials: true }
      )
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.log('error while checking email exist or not', error);
          return throwError(
            () => new Error('error while checking email exist or not')
          );
        })
      );
  }
  findName(name: string) {
    return this._http
      .post<{ isExisting: boolean }>(
        `${this._api}/agency/isExistingName`,
        {
          name,
        },
        { withCredentials: true }
      )
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.log('error while checking email exist or not', error);
          return throwError(
            () => new Error('error while checking name exist or not')
          );
        })
      );
  }
  isConfirmed() {
    return this._http
      .get<{ isConfirmed: boolean }>(`${this._api}/agency/isConfirmed`, {
        withCredentials: true,
      })
      .pipe(
        map((data) => {
          console.log(data);
          return data.isConfirmed;
        }),
        catchError((error) => {
          console.log('error while checking agency confirmed or not', error);
          return throwError(
            () => new Error('error while checking agency confirmed or not')
          );
        })
      );
  }
  registerAgency(formData: FormData) {
    return this._http.post<{ agency: IAgency }>(
      `${this._api}/agency/signup`,
      formData,
      { withCredentials: true }
    );
  }
  verifyOtp(formData: {
    otp: string;
    email: string | null | undefined;
  }) {
    return this._http.post<{
      agency: IAgency;
      message: string;
      success: boolean;
      token: string;
    }>(`${this._api}/otp/agency`, formData, { withCredentials: true });
  }
  resendOtp(formData: { email: string | null | undefined }) {
    return this._http.post<{ agency: IAgency }>(
      `${this._api}/otp/resend`,
      formData,
      { withCredentials: true }
    );
  }
}
