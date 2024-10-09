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
import { IAdmin } from '../../../models/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private readonly api = 'http://localhost:3000';
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  private cookie = new Cookies();

  constructor(private http: HttpClient) {
    const token = this.cookie.get('accessToken');
    if (token) {
      this.setAccessToken(token);
    }
  }

  login(adminDat: any): Observable<{
    message: string;
    admin: IAdmin;
    success: boolean;
    token: string;
  }> {
    return this.http
      .post<{
        message: string;
        admin: IAdmin;
        success: boolean;
        token: string;
      }>(`${this.api}/auth/admin`, adminDat, { withCredentials: true })
      .pipe(
        map((response) => {
          const accessToken = response.token;
          if (accessToken) {
            this.setAccessToken(accessToken);
          }
          return response;
        })
      );
  }

  logout(): Observable<any> {
    return this.http
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
  }

  setAccessToken(token: string) {
    this.accessTokenSubject.next(token);
    this.cookie.set('accessToken', token, {
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
  }

  getAccessToken(): string | null {
    return this.accessTokenSubject.getValue();
  }

  clearAccessToken(): void {
    this.accessTokenSubject.next(null);
    this.cookie.remove('accessToken', { path: '/' });
  }

  refreshToken(): Observable<string> {
    return this.http
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

  validateToken(token: string): Observable<boolean> {
    return this.http
      .post<{ valid: boolean }>(
        `${this.api}/auth/validate-token`,
        { token },
        { withCredentials: true }
      )
      .pipe(map((response) => response.valid));
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
