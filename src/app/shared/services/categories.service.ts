import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _api = 'http://localhost:3000/category';

  constructor(private _http: HttpClient) {}

  getCategories(currentPage: number, limit: number) {
    const params = new HttpParams()
      .set('currentPage', currentPage)
      .set('limit', limit);
    return this._http.get<{
      success: boolean;
      categories: ICategory[];
      totalCategories: number;
      currentPage: number;
    }>(`${this._api}/categories`, {
      params,
      withCredentials: true,
    });
  }

  addCategory(category: FormGroup) {
    return this._http.post<{
      success: boolean;
      message: string;
      newCategory: ICategory;
    }>(`${this._api}/add`, category, {
      withCredentials: true,
    });
  }
  updateCategory(id: string | null, category: FormGroup) {
    return this._http.put(`${this._api}/edit/${id}`, category, {
      withCredentials: true,
    });
  }
  changeStatus(id: string, status: boolean) {
    return this._http.patch<{
      success: boolean;
      message: string;
      warning: boolean;
    }>(
      `${this._api}/changeStatus/${id}`,
      { status },
      { withCredentials: true }
    );
  }
}
