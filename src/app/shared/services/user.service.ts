import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { IPackage } from '../../interfaces/package/package.interface';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../Environment/environment';
import { ApiResponse } from '../../interfaces';
import { AllPackagesResponse } from '../../interfaces/package/response/packages.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _BASE_URL = environment.apiUrl;
  private readonly _api = this._BASE_URL;
  constructor(private _http: HttpClient) {}

  findEmail(email: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.post<ApiResponse<{ isExisting: boolean }>>(
      `${this._api}/user/check-email`,
      {
        email,
      },
      { headers }
    );
  }

  registerUser(formData: IUser) {
    return this._http.post<ApiResponse<{ user: IUser }>>(
      `${this._api}/user/signup`,
      formData,
      { withCredentials: true }
    );
  }

  verifyOtpUser(formData: { otp: string; email: string | null | undefined }) {
    return this._http.post<ApiResponse<{ user: IUser }>>(
      `${this._api}/otp/verify/user`,
      formData,
      { withCredentials: true }
    );
  }

  resendOtp(formData: { email: string | null | undefined }) {
    return this._http.post<ApiResponse<{ user: IUser }>>(
      `${this._api}/otp/resend`,
      formData,
      { withCredentials: true }
    );
  }

  getUserData() {
    return this._http.get<ApiResponse<{ user: IUser }>>(
      `${this._api}/user/profile`,
      {
        withCredentials: true,
      }
    );
  }

  uploadProfileImg(data: FormData) {
    return this._http.patch<ApiResponse<{}>>(
      `${this._api}/user/profile-image`,
      data,
      {
        withCredentials: true,
        reportProgress: true,
        observe: 'events',
      }
    );
  }
  updateUserProfile(userData: FormGroup) {
    return this._http.patch<ApiResponse<{}>>(
      `${this._api}/user/profile`,
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
    return this._http.get<ApiResponse<AllPackagesResponse>>(
      `${this._api}/user/packages`,
      { params, withCredentials: true }
    );
  }

  getSinglePackage(id: string) {
    return this._http.get<ApiResponse<{ package: IPackage }>>(
      `${this._api}/user/package/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  changePassword(passworData: FormGroup) {
    return this._http.patch<ApiResponse<{}>>(
      `${this._api}/user/change-password`,
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
