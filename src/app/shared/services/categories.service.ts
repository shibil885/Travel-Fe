import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICategory } from '../../interfaces/category/category.interface';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../Environment/environment';
import { ApiResponse } from '../../interfaces';
import { CategoryResponse } from '../../interfaces/category/response/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _BASE_URL = environment.apiUrl;
  private _api = `${this._BASE_URL}/category`;

  constructor(private _http: HttpClient) {}

  getCategories(currentPage: number, limit: number) {
    const params = new HttpParams()
      .set('currentPage', currentPage)
      .set('limit', limit);
    return this._http.get<ApiResponse<CategoryResponse>>(`${this._api}`, {
      params,
      withCredentials: true,
    });
  }

  addCategory(category: FormGroup) {
    return this._http.post<ApiResponse<{ category: ICategory }>>(
      `${this._api}`,
      category,
      {
        withCredentials: true,
      }
    );
  }
  updateCategory(id: string | null, category: FormGroup) {
    return this._http.put<ApiResponse<{ category: ICategory }>>(
      `${this._api}/${id}`,
      category,
      {
        withCredentials: true,
      }
    );
  }
  changeStatus(id: string, status: boolean) {
    return this._http.patch<ApiResponse<{}>>(
      `${this._api}/${id}/status`,
      { status: status ? 'block' : 'unblock' },
      { withCredentials: true }
    );
  }
}
