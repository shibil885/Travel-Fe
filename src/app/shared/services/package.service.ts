import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPackage } from '../../interfaces/package.interface';
import { ICategory } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addPackages(packageData: FormData) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.api}/package/add`,
      packageData,
      {
        withCredentials: true,
      }
    );
  }

  getCategories() {
    return this.http.get<{
      success: boolean;
      message: string;
      categories: ICategory[];
    }>(`${this.api}/category/categories`, {
      withCredentials: true,
    });
  }

  getPackages(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<{
      success: boolean;
      message: string;
      totalItems: number;
      currentPage: number;
      packages: IPackage[];
    }>(`${this.api}/package/getAllPackages`, {
      params,
      withCredentials: true,
    });
  }

  onChangeStatus(packageId: string | undefined, action: boolean) {
    if (!packageId) return;
    return this.http.patch(
      `${this.api}/package/changeStatus/${packageId}`,
      { action },
      { withCredentials: true }
    );
  }
  onSaveChanges(chagedData: IPackage, packagId: string | undefined) {
    return this.http.put<{ message: string; success: boolean }>(
      `${this.api}/package/saveChanges/${packagId}`,
      chagedData,
      {
        withCredentials: true,
      }
    );
  }
  onSearchPackages(searchText: string) {
    const params = new HttpParams().set('searchText', searchText);
    return this.http.get<{success: boolean, packages: IPackage[]}>(`${this.api}/package/searchPackage`, {
      params,
      withCredentials: true,
    });
  }
}
