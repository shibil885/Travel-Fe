import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FilterData } from '../../interfaces/filterData.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  
  getAllUsers(): Observable<{
    message: string;
    success: boolean;
    users: any[];
  }> {
    return this.http
      .get<{ message: string; success: boolean; users: any[] }>(
        `${this.api}/admin/users`,
        { withCredentials: true }
      )
      .pipe(
        map((data) => data),
        catchError((error) => {
          console.log('Error fetching users:', error);
          return throwError(() => new Error('Error fetching users'));
        })
      );
  }

  getAllAgencies(): Observable<{
    message: string;
    success: boolean;
    agencies: any[];
  }> {
    return this.http
      .get<{ message: string; success: boolean; agencies: any[] }>(
        `${this.api}/admin/agencies`,
        { withCredentials: true }
      )
      .pipe(map((data) => data));
  }

  getAllCategories(): Observable<{
    message: string;
    success: boolean;
    categories: any[];
  }> {
    return this.http
      .get<{ message: string; success: boolean; categories: any[] }>(
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
    return this.http
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
    return this.http
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
    return this.http
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
  getFilteredData(filters: FilterData, user: string): Observable<any> {
    let params = new HttpParams();

    if (filters.isActive !== undefined)
      params = params.append('isActive', filters.isActive.toString());
    if (filters.isVerified !== undefined)
      params = params.append('isVerified', filters.isVerified.toString());
    if (filters.isConfirmed !== undefined)
      params = params.append('isConfirmed', filters.isConfirmed.toString());
    return this.http.post(`${this.api}/admin/filter`, { user }, { params });
  }
  searchUsers(searchText: string, user: string) {
    let params = new HttpParams().set('searchText', searchText)
    return this.http.post(
      `${this.api}/admin/searchUsers`,
      { user },  
      { params } 
    );
  }
  
}
