import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IAgency } from '../../models/agency.model';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private api = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) {}

  findEmail(email: string) {
    return this.http
      .post<{ isExisting: boolean }>(`${this.api}/agency/isExistingMail`, {
        email,
      })
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
    return this.http
      .post<{ isExisting: boolean }>(`${this.api}/agency/isExistingName`, {
        name,
      })
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
  isConfirmed(email: string | undefined) {
    return this.http
      .post<{ isConfirmed: boolean }>(`${this.api}/agency/isConfirmed`, {
        email
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
  registerAgency(formData: FormData): Observable<any> {
    return this.http.post<{ agency: IAgency }>(
      `${this.api}/agency/signup`,
      formData
    );
  }
  verifyOtp(formData: { otp: string; email: string | null | undefined}): Observable<any> {
    console.log('verify otp from agency');
    return this.http.post<{ token: string, agency: IAgency }>(
      `${this.api}/otp/agency`,
      formData
    );
  }
  resendOtp(formData: { email: string | null | undefined}): Observable<any> {
    return this.http.post<{ agency: IAgency }>(
      `${this.api}/otp/resend`,
      formData
    );
  }
  login(formData: { email: string; password: string }): Observable<any> {
    return this.http.post<{ access_token: string, agency: IAgency }>(
      `${this.api}/auth/agency`,
      formData
    );
  }
}
