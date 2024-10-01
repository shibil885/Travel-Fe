import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Cookies from 'universal-cookie';
import { IAdmin } from '../../../models/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private readonly api = 'http://localhost:3000';
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  private cookies: Cookies;

  constructor(private http: HttpClient) {
    this.cookies = new Cookies(); 
    const token = this.cookies.get('admin_accessToken');
    console.log('Retrieved Token:', token); 
    if (token) {
      this.setAccessToken(token);
    } else {
      console.log('Token not found in cookies admin');
    }
  }

  // Admin login functionality
  login(adminData: any): Observable<{
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
      }>(`${this.api}/auth/admin`, adminData, { withCredentials: true })
      .pipe(
        tap((response) => {
          const accessToken = response.token;
          console.log('Admin Access Token:', accessToken);
          if (accessToken) {
            this.setAccessToken(accessToken);
          }
        })
      );
  }

  // Set access token and store in cookies
  setAccessToken(token: string): void {
    this.accessTokenSubject.next(token);
    this.cookies.set('admin_accessToken', token, {
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
    this.cookies.remove('admin_accessToken', { path: '/' });
  }

  refreshToken(): Observable<string> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.api}/auth/adminRefresh`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          const newAccessToken = response.accessToken;
          this.setAccessToken(newAccessToken);
        }),
        map((response) => response.accessToken)
      );
  }

  // Validate the provided token
  validateToken(token: string): Observable<boolean> {
    console.log('Validating Admin Token:', token);
    return this.http
      .post<{ valid: boolean }>(`${this.api}/auth/validate-token-admin`, {
        token,
      }, { withCredentials: true})
      .pipe(map((response) => response.valid));
  }

  // Check if admin is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
