import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IUser } from '../../models/user.model';
import { IPackage } from '../../interfaces/package.interface';
import { AuthService } from '../../auth/service/service.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _BASE_URL = import.meta.env.NG_APP_BASE_URL;
  private readonly _api = this._BASE_URL;
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  findEmail(email: string) {
    return this._http
      .post<{ isExisting: boolean }>(`${this._api}/user/isExistingMail`, {
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

  registerUser(formData: IUser) {
    console.log('formdata', formData);
    return this._http.post<{ user: IUser; message: string; success: boolean }>(
      `${this._api}/user/signup`,
      formData,
      { withCredentials: true }
    );
  }

  verifyOtpUser(formData: { otp: string; email: string | null | undefined }) {
    return this._http.post<{
      message: string;
      success: boolean;
      user: IUser;
      token: string;
    }>(`${this._api}/otp/user`, formData, { withCredentials: true });
  }

  resendOtp(formData: { email: string | null | undefined }) {
    return this._http.post<{ user: IUser; success: boolean; message: string }>(
      `${this._api}/otp/resend`,
      formData,
      { withCredentials: true }
    );
  }

  getUserData() {
    return this._http.get<{ success: boolean; user: IUser; message: string }>(
      `${this._api}/user/details`,
      {
        withCredentials: true,
      }
    );
  }

  uploadProfileImg(data: FormData) {
    return this._http.patch(`${this._api}/user/profileImage-update`, data, {
      withCredentials: true,
      reportProgress: true,
      observe: 'events',
    });
  }
  updateUserProfile(userData: FormGroup) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/user/update-userProfile`,
      userData,
      {
        withCredentials: true,
      }
    );
  }

  getPackages(page: number, limit: number) {
    const params = new HttpParams()
      .set('limit', limit)
      .set('currentPage', page);
    return this._http.get<{
      success: boolean;
      message: string;
      packages: IPackage[];
      packagesCount: number;
      currentPage: number;
    }>(`${this._api}/user/getPackages`, { params, withCredentials: true });
  }

  getSinglePackage(id: string) {
    return this._http.get<{ success: boolean; package: IPackage }>(
      `${this._api}/user/package/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  changePassword(passworData: FormGroup) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/user/changePassword`,
      passworData,
      {
        withCredentials: true,
      }
    );
  }

  generatPassword(email: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/auth/resetLink`,
      {
        email,
        role: 'user',
      },
      { withCredentials: true }
    );
  }

  validateLink(token: string) {
    const params = new HttpParams().set('token', token);
    return this._http.get<{ success: boolean; message: string }>(
      `${this._api}/auth/validateLink`,
      { params }
    );
  }

  resetPassword(token: string | null, password: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/auth/resetPassword`,
      {
        password,
        token: token,
        role: 'user',
      },
      { withCredentials: true }
    );
  }
}
