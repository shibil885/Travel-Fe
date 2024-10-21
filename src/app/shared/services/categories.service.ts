import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}

  getCategories(currentPage: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('currentPage', currentPage)
      .set('limit', limit);
    return this.http.get(`${this.api}/categories`, {
      params,
      withCredentials: true,
    });
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.api}/add`, category, {
      withCredentials: true,
    });
  }
  updateCategory(id: string | null, category: any) {
    return this.http.put(`${this.api}/edit/${id}`, category, {
      withCredentials: true,
    });
  }
  changeStatus(id: string, status: boolean) {
    return this.http.patch<{
      success: boolean;
      message: string;
      warning: boolean;
    }>(`${this.api}/changeStatus/${id}`, { status }, { withCredentials: true });
  }
}
