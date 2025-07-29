import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICategory } from '../../interfaces/common/category.interface';
import { environment } from '../../../Environment/environment';
import { AllAgencyRespose, ApiResponse, FilterData } from '../../interfaces';
import { AllUsersReposnse } from '../../interfaces/user/response/users.interface';
import { AgencyStatusUpdationResponse } from '../../interfaces/agency/response/statusUpdate.interface';
import { UserStatusUpdationResponse } from '../../interfaces/user/response/userStatusUpdation.interface';
import { AgencyConfirmationResponse } from '../../interfaces/agency/response/confirmation.interface';

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
      `${this.api}/admin/agency`,
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
      `${this.api}/admin/user`,
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

  changeUserStatus(userId: string, status: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');

    return this._http.patch<ApiResponse<UserStatusUpdationResponse>>(
      `${this.api}/admin/user/${userId}`,
      { status },
      { withCredentials: true, headers }
    );
  }
  changeAgencyStatus(agencyId: string, status: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.patch<ApiResponse<AgencyStatusUpdationResponse>>(
      `${this.api}/admin/agency/${agencyId}`,
      { status },
      { withCredentials: true, headers }
    );
  }
  changeAgencyConfirmation(id: string, status: string) {
    console.log('ssss', status);
    
    const headers = new HttpHeaders().set('skip-loading', 'true');

    return this._http.patch<ApiResponse<AgencyConfirmationResponse>>(
      `${this.api}/admin/agency/${id}/confirm`,
      { status },
      { withCredentials: true, headers }
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
