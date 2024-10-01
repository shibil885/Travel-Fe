import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import Cookies from 'universal-cookie';
import { IAgency } from '../../../models/agency.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AgencyAuthService {
  private readonly api = 'http://localhost:3000';
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  private cookie: Cookies;
  constructor(private http: HttpClient, private router: Router) {
    this.cookie = new Cookies();
    const token = this.cookie.get('agency_accessToken');
    console.log('Retrieved Token:', token);
    if (token) {
      this.setAccessToken(token);
    } else {
      console.log('Token not found in cookies agency');
    }
  }

  login(agencyData: any): Observable<{
    message: string;
    agency: IAgency;
    success: boolean;
    access_token: string;
  }> {
    return this.http
      .post<{
        message: string;
        agency: IAgency;
        success: boolean;
        access_token: string;
      }>(`${this.api}/auth/agency`, agencyData, { withCredentials: true })
      .pipe(
        map((response) => {
          const accessToken = response.access_token;
          console.log('agencies acccc', accessToken);
          if (accessToken) {
            this.setAccessToken(accessToken);
          }
          return response;
        })
      );
  }

  setAccessToken(token: string): void {
    this.accessTokenSubject.next(token);
    this.cookie.set('agency_accessToken', token, {
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
    this.cookie.remove('agency_accessToken', { path: '/' });
    this.http
      .patch(`${this.api}/agency/logout`, {}, { withCredentials: true })
      .subscribe(() => {
        this.router.navigate(['/agency/login']);
      });
  }

  refreshToken(): Observable<string> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.api}/auth/agencyRefresh`,
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
    console.log('invoking', token);
    return this.http
      .post<{ valid: boolean }>(
        `${this.api}/auth/validate-token-agency`,
        {
          token,
        },
        { withCredentials: true }
      )
      .pipe(map((response) => response.valid));
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
