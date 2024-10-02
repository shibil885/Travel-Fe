import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IUser } from '../../../models/user.model';
import Cookies from 'universal-cookie';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private readonly api = 'http://localhost:3000';
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  private cookie = new Cookies();

  constructor(private http: HttpClient) {
    const token = this.cookie.get('accessToken');
    if (token) {
      this.setAccessToken(token);
    }
  }

  login(userData: any): Observable<{
    message: string;
    user: IUser;
    success: boolean;
    access_token: string;
  }> {
    return this.http
      .post<{
        message: string;
        user: IUser;
        success: boolean;
        access_token: string;
      }>(`${this.api}/auth/user`, userData, { withCredentials: true })
      .pipe(
        map((response) => {
          const accessToken = response.access_token;
          if (accessToken) {
            this.setAccessToken(accessToken);
          }
          return response;
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
      .post<{ valid: boolean }>(`${this.api}/auth/validate-token`, { token })
      .pipe(map((response) => response.valid));
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
 