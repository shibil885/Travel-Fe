import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPackage } from '../../interfaces/package/package.interface';
import { ICategory } from '../../interfaces/common/category.interface';
import { environment } from '../../../Environment/environment';
import { ApiResponse } from '../../interfaces';
import { AllPackagesResponse } from '../../interfaces/package/response/packages.interface';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private readonly _BASE_URL = environment.apiUrl;
  private _api = this._BASE_URL;

  constructor(private _http: HttpClient) {}

  addPackages(packageData: FormData) {
    return this._http.post<ApiResponse<{ package: IPackage }>>(
      `${this._api}/package`,
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
    return this._http.get<ApiResponse<AllPackagesResponse>>(
      `${this._api}/package`,
      {
        params,
        withCredentials: true,
      }
    );
  }

  onChangeStatus(packageId: string | undefined, action: boolean) {
    if (!packageId) return;
    return this._http.patch<ApiResponse<{ isActive: boolean }>>(
      `${this._api}/package/${packageId}/status`,
      { action },
      { withCredentials: true }
    );
  }

  onSaveChanges(chagedData: IPackage, packagId: string | undefined) {
    return this._http.put<ApiResponse<{}>>(
      `${this._api}/package/${packagId}`,
      chagedData,
      {
        withCredentials: true,
      }
    );
  }
  onSearchPackages(searchText: string) {
    const params = new HttpParams().set('searchText', searchText);
    return this._http.get<ApiResponse<{ packages: IPackage[] }>>(
      `${this._api}/package/search`,
      {
        params,
        withCredentials: true,
      }
    );
  }

  getOfferPackages() {
    return this._http.get<ApiResponse<{ packages: IPackage[] }>>(
      `${this._api}/package/offers`,
      {
        withCredentials: true,
      }
    );
  }
  getTopBookedPackages() {
    return this._http.get<ApiResponse<{ packages: IPackage[] }>>(
      `${this._api}/package/top-booked`,
      {
        withCredentials: true,
      }
    );
  }
}
