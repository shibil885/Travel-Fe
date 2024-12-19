import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPackage } from '../../interfaces/package.interface';
import { ICategory } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private readonly _BASE_URL = import.meta.env.NG_APP_BASE_URL;
  private _api = this._BASE_URL;

  constructor(private _http: HttpClient) {}

  addPackages(packageData: FormData) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/package/add`,
      packageData,
      {
        withCredentials: true,
      }
    );
  }

  getCategories() {
    return this._http.get<{
      success: boolean;
      message: string;
      categories: ICategory[];
    }>(`${this._api}/category/categories`, {
      withCredentials: true,
    });
  }

  getPackages(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      message: string;
      totalItems: number;
      currentPage: number;
      packages: IPackage[];
    }>(`${this._api}/package/getAllPackages`, {
      params,
      withCredentials: true,
    });
  }

  onChangeStatus(packageId: string | undefined, action: boolean) {
    if (!packageId) return;
    return this._http.patch(
      `${this._api}/package/changeStatus/${packageId}`,
      { action },
      { withCredentials: true }
    );
  }

  onSaveChanges(chagedData: IPackage, packagId: string | undefined) {
    return this._http.put<{ message: string; success: boolean }>(
      `${this._api}/package/saveChanges/${packagId}`,
      chagedData,
      {
        withCredentials: true,
      }
    );
  }
  onSearchPackages(searchText: string) {
    const params = new HttpParams().set('searchText', searchText);
    return this._http.get<{ success: boolean; packages: IPackage[] }>(
      `${this._api}/package/searchPackage`,
      {
        params,
        withCredentials: true,
      }
    );
  }

  getOfferPackages() {
    return this._http.get<{
      success: boolean;
      message: string;
      packages: IPackage[];
    }>(`${this._api}/package/offer`, {
      withCredentials: true,
    });
  }
  getTopBookedPackages() {
    return this._http.get<{
      success: boolean;
      message: string;
      packages: IPackage[];
    }>(`${this._api}/package/topBooked`, {
      withCredentials: true,
    });
  }
}
