import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IAgency } from '../../models/agency.model';
import { IUser } from '../../models/user.model';
import { ICategory } from '../../interfaces/common/category.interface';
import { environment } from '../../../Environment/environment';
import { AllAgencyRespose, ApiResponse, FilterData } from '../../interfaces';
import { AllUsersReposnse } from '../../interfaces/user/response/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly _BASE_URL = environment.apiUrl;
  private api = this._BASE_URL;

  constructor(private _http: HttpClient) {}

  getAllAgencies(page: number = 1, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this._http.get<ApiResponse<AllAgencyRespose>>(
      `${this.api}/admin/agencies`,
      {
        params,
        withCredentials: true,
      }
    );
  }
  getAllUsers(page: number = 1, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this._http.get<ApiResponse<AllUsersReposnse>>(
      `${this.api}/admin/users`,
      { params, withCredentials: true }
    );
  }

  getAllCategories(): Observable<{
    message: string;
    success: boolean;
    categories: ICategory[];
  }> {
    return this._http
      .get<{ message: string; success: boolean; categories: ICategory[] }>(
        `${this.api}/category/categories`,
        { withCredentials: true }
      )
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.log('Error fetching agencies:', error);
          return throwError(() => new Error('Error fetching agencies'));
        })
      );
  }
  changeUserStatus(
    id: string,
    status: string
  ): Observable<{ message: string; success: boolean }> {
    return this._http
      .patch<{ message: string; success: boolean }>(
        `${this.api}/admin/changeUserStatus/${id}`,
        { status },
        { withCredentials: true }
      )
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.log('Error:', error);
          return throwError(
            () => new Error('Error while chage status of user')
          );
        })
      );
  }
  changeAgencyStatus(
    id: string,
    status: string
  ): Observable<{ message: string; success: boolean }> {
    return this._http
      .patch<{ message: string; success: boolean }>(
        `${this.api}/admin/changeAgencyStatus/${id}`,
        { status },
        { withCredentials: true }
      )
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.log('Error:', error);
          return throwError(
            () => new Error('Error while chage status of agency')
          );
        })
      );
  }
  confirmation(
    id: string,
    status: string
  ): Observable<{ message: string; success: boolean }> {
    return this._http
      .patch<{ message: string; success: boolean }>(
        `${this.api}/admin/confirmation/${id}`,
        { status },
        { withCredentials: true }
      )
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.log('Error:', error);
          return throwError(() => new Error(`Error while ${status} of agency`));
        })
      );
  }
  getFilteredData(filters: FilterData, user: string): Observable<Object> {
    let params = new HttpParams();

    if (filters.isActive !== undefined)
      params = params.append('isActive', filters.isActive.toString());
    if (filters.isVerified !== undefined)
      params = params.append('isVerified', filters.isVerified.toString());
    if (filters.isConfirmed !== undefined)
      params = params.append('isConfirmed', filters.isConfirmed.toString());
    return this._http.post(
      `${this.api}/admin/filter`,
      { user },
      { params, withCredentials: true }
    );
  }

  searchUsers(searchText: string, user: string) {
    let params = new HttpParams().set('searchText', searchText);
    return this._http.post(
      `${this.api}/admin/searchUsers`,
      { user },
      { params, withCredentials: true }
    );
  }
}
