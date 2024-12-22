import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Role } from '../../enum/role.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _BASE_URL = import.meta.env.NG_APP_BASE_URL;
  private readonly _api = this._BASE_URL;
  constructor(private _http: HttpClient, private readonly _router: Router) {}

  login(
    loginData: { email: string; password: string },
    role: 'admin' | 'agency' | 'user'
  ) {
    const endpoints: { [key in 'admin' | 'agency' | 'user']: string } = {
      admin: `${this._api}/auth/admin`,
      agency: `${this._api}/auth/agency`,
      user: `${this._api}/auth/user`,
    };
    const loginUrl = endpoints[role];
    return this._http.post<{
      message: string;
      success: boolean;
      access_token: string;
      [key: string]: any;
    }>(loginUrl, loginData, { withCredentials: true });
  }

  logout(role: string) {
    if (role === 'admin') {
      return this._http.patch(
        `${this._api}/admin/logout`,
        {},
        { withCredentials: true }
      );
    } else if (role === 'agency') {
      return this._http.patch(
        `${this._api}/agency/logout`,
        {},
        { withCredentials: true }
      );
    } else {
      return this._http.patch(
        `${this._api}/user/logout`,
        {},
        { withCredentials: true }
      );
    }
  }

  validateToken(): Observable<{
    success: boolean;
    message: string;
    valid: boolean;
    role: Role;
    id: string;
  }> {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http
      .post<{
        success: boolean;
        message: string;
        valid: boolean;
        role: Role;
        id: string;
      }>(
        `${this._api}/auth/validate-token`,
        {},
        { headers, withCredentials: true }
      )
      .pipe(
        catchError((error) => {
          return of({
            success: error.error.success,
            message: error.error?.message,
            valid: error.error.valid,
            role: error.error?.role,
            id: error.error.id,
          });
        })
      );
  }

  refreshToken(): Observable<{
    success: string;
    message: string;
    role: Role;
    isRefreshed: boolean;
    id: string;
  }> {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http
      .post<{
        success: string;
        message: string;
        role: Role;
        isRefreshed: boolean;
        id: string;
      }>(`${this._api}/auth/refresh`, {}, { headers, withCredentials: true })
      .pipe(
        catchError((error) => {
          return of({
            success: error.error.success,
            message: error.error?.message,
            role: error.error?.role,
            isRefreshed: error.error.isRefreshed,
            id: error.error.id,
          });
        })
      );
  }
}
