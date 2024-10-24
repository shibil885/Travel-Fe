import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IUser } from '../../models/user.model';
import { IPackage } from '../../interfaces/package.interface';
import { AuthService } from '../../auth/service/service.service';
import { HtmlParser } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  findEmail(email: string) {
    return this.http
      .post<{ isExisting: boolean }>(`${this.api}/user/isExistingMail`, {
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
  registerUser(formData: any) {
    console.log('formdata', formData);
    return this.http.post<{ user: IUser; message: string; success: boolean }>(
      `${this.api}/user/signup`,
      formData,
      { withCredentials: true }
    );
  }
  verifyOtpUser(formData: {
    otp: string;
    email: string | null | undefined;
  }): Observable<any> {
    return this.http
      .post<{
        message: string;
        success: boolean;
        user: IUser;
        token: string;
      }>(`${this.api}/otp/user`, formData, { withCredentials: true })
      .pipe(
        map((response) => {
          this.authService.setAccessToken(response.token);
          return response;
        })
      );
  }

  resendOtp(formData: { email: string | null | undefined }): Observable<any> {
    return this.http.post<{ user: IUser; success: boolean; message: string }>(
      `${this.api}/otp/resend`,
      formData,
      { withCredentials: true }
    );
  }
  getPackages(page: number, limit: number) {
    const params = new HttpParams()
      .set('limit', limit)
      .set('currentPage', page);
    return this.http.get<{
      success: boolean;
      message: string;
      packages: IPackage[];
      packagesCount: number;
      currentPage: number;
    }>(`${this.api}/user/getPackages`, { params, withCredentials: true });
  }
  getSinglePackage(id: string) {
    return this.http.get<{ success: boolean; package: IPackage }>(
      `${this.api}/user/package/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
