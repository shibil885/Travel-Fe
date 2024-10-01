import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IAgency } from '../../models/agency.model';
import { AgencyAuthService } from '../../auth/services/agency/agency-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private api = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private authService: AgencyAuthService,
    private router: Router,

  ) {}

  findEmail(email: string) {
    return this.http
      .post<{ isExisting: boolean }>(
        `${this.api}/agency/isExistingMail`,
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
    return this.http
      .post<{ isExisting: boolean }>(
        `${this.api}/agency/isExistingName`,
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
  isConfirmed(email: string | undefined) {
    return this.http
      .post<{ isConfirmed: boolean }>(
        `${this.api}/agency/isConfirmed`,
        {
          email,
        },
        { withCredentials: true }
      )
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
      formData,
      { withCredentials: true }
    );
  }
  verifyOtp(formData: {
    otp: string;
    email: string | null | undefined;
  }): Observable<any> {
    return this.http
      .post<{
        agency: IAgency;
        message: string;
        success: boolean;
        token: string;
      }>(`${this.api}/otp/agency`, formData, { withCredentials: true})
      .pipe(
        map((response) => {
          console.log('reeeeeeeeeeeeeeeeeeeee', response);
          this.authService.setAccessToken(response.token);
          this.router.navigate(['/agency/home'])
        })
      );
  }
  resendOtp(formData: { email: string | null | undefined }): Observable<any> {
    return this.http.post<{ agency: IAgency }>(
      `${this.api}/otp/resend`,
      formData , { withCredentials: true }
    );
  }
}
