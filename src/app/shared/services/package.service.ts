import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private api = 'http://localhost:3000/package';

  constructor(private http: HttpClient) {}

  addPackages(packageData: any) {
    return this.http.post(`${this.api}/add/`,packageData, { withCredentials: true});
  }
}
  