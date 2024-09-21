import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{message: string,success: boolean, users: any[]}> {
    return this.http.get<{message: string,success: boolean, users: any[]}>(`${this.api}/admin/users`).pipe(
      map(data =>  data),
      catchError(error => {
        console.log('Error fetching users:', error);
        return throwError(() => new Error('Error fetching users'));
      })
    );
  }

  getAllAgencies (): Observable<{message: string, success: boolean, agencies: any[]}> {
    return this.http.get<{message: string, success: boolean, agencies: any[]}>(`${this.api}/admin/agencies`).pipe(
      map(data => data),
      catchError(error => {
        console.log('Error:', error);
        return throwError(() => new Error('Error in fetching Agency'));
      })
    )
  }

  getAllCategories (): Observable<{message: string, success: boolean, categories: any[]}>  {
     return this.http.get<{message: string, success: boolean, categories: any[] }>(`${this.api}/category/categories`).pipe(
      map(data => data),
      catchError( error => {
        console.log('Error fetching agencies:', error);
        return throwError(() => new Error('Error fetching agencies'))
      })
     )
  }
  changeUseStatus(id: string,status: boolean): Observable<{message: string ,success: boolean}>{
    return this.http.patch<{message: string ,success: boolean}>(`${this.api}/admin/changeUserStatus/${id}`,status).pipe(
      map(data => data),
      catchError(error => {
        console.log('Error:', error);
        return throwError(() => new Error('Error while chage status of user'))
      })
    )
  }
}