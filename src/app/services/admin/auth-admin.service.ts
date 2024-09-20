import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminLoginInterface } from '../../interfaces/admin/adminLogin.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  private api = 'http://localhost:3000/auth'
  constructor(private http: HttpClient) { }

  login(adminData: AdminLoginInterface) {
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', adminData);
    return this.http.post<{ token: string }>(`${this.api}/admin`,adminData)
  }
}
