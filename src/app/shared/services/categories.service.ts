import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.api}/categories`);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.api}/add`, category);
  }
  updateCategory(id: string | null, category: any) {
    return this.http.put(`${this.api}/edit/${id}`, category);
  }
}
