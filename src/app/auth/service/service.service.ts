import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import Cookies from 'universal-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api = 'http://localhost:3000';
  private _accessTokenSubject = new BehaviorSubject<string | null>(null);
  private _cookie = new Cookies();

  constructor(private _http: HttpClient) {
    const token = this._cookie.get('accessToken');
    if (token) {
      this.setAccessToken(token);
    }
  }

  login(
    loginData: { email: string; password: string },
    role: 'admin' | 'agency' | 'user'
  ) {
    const endpoints: { [key in 'admin' | 'agency' | 'user']: string } = {
      admin: `${this.api}/auth/admin`,
      agency: `${this.api}/auth/agency`,
      user: `${this.api}/auth/user`,
    };
    const loginUrl = endpoints[role];
    return this._http
      .post<{
        message: string;
        success: boolean;
        access_token: string;
        [key: string]: any;
      }>(loginUrl, loginData, { withCredentials: true })
      .pipe(
        map((response) => {
          const accessToken = response.access_token;
          if (accessToken) {
            this.setAccessToken(accessToken);
          }
          return response;
        }),
        catchError((error) => {
          console.log('Login error: ', error);
          return throwError(() => error);
        })
      );
  }

  logout(role: string) {
    if (role === 'admin') {
      return this._http
        .patch(`${this.api}/admin/logout`, {}, { withCredentials: true })
        .pipe(
          tap(() => {
            this.clearAccessToken();
          }),
          catchError((error) => {
            console.error('error', error);
            return throwError(() => error);
          })
        );
    } else if (role === 'agency') {
      return this._http
        .patch(`${this.api}/agency/logout`, {}, { withCredentials: true })
        .pipe(
          tap(() => {
            this.clearAccessToken();
          }),
          catchError((error) => {
            console.error('error', error);
            return throwError(() => error);
          })
        );
    } else {
      return this._http
        .patch(`${this.api}/user/logout`, {}, { withCredentials: true })
        .pipe(
          tap(() => {
            this.clearAccessToken();
          }),
          catchError((error) => {
            console.error('UserAuthService: logout API error', error);
            return throwError(() => error);
          })
        );
    }
  }

  setAccessToken(token: string) {
    this._accessTokenSubject.next(token);
    this._cookie.set('accessToken', token, {
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
  }

  getAccessToken(): string | null {
    return this._accessTokenSubject.getValue();
  }

  clearAccessToken(): void {
    this._accessTokenSubject.next(null);
    this._cookie.remove('accessToken', { path: '/' });
  }

  refreshToken(): Observable<string> {
    return this._http
      .post<{ accessToken: string }>(
        `${this.api}/auth/refresh`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((response) => response.accessToken),
        tap((newAccessToken: string) => {
          this.setAccessToken(newAccessToken);
        })
      );
  }

  validateToken(): Observable<{ valid: boolean; role: string }> {
    return this._http
      .post<{ valid: boolean; role: string }>(
        `${this.api}/auth/validate-token`,
        {},
        { withCredentials: true }
      )
      .pipe(map((res) => res));
  }
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
