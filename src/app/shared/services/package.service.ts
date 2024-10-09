import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../../interfaces/package.interface';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private api = 'http://localhost:3000/package';

  constructor(private http: HttpClient) {}

  addPackages(packageData: any) {
    return this.http.post(`${this.api}/add/`, packageData, {
      withCredentials: true,
    });
  }

  getPackages() { 
    return this.http.get<{ success: boolean; message: string; packages: any }>(
      `${this.api}/getAllPackages`,
      {
        withCredentials: true,
      }
    );
  }

  onChangeStatus(packageId: string | undefined, action: boolean) {
    if (!packageId) return;
    return this.http.patch(
      `${this.api}/changeStatus/${packageId}`,
      { action },
      { withCredentials: true }
    );
  }
  onSaveChanges(chagedData: Package) {
    return this.http.post(`${this.api}/saveChanges`, chagedData, {
      withCredentials: true,
    });
  }
}
