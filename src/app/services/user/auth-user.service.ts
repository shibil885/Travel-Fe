import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginProps } from '../../interfaces/user/userLogin.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  api = 'http://localhost:3000/auth';
  constructor( private http: HttpClient) { }
  login(userData: UserLoginProps) {
    return this.http.post<{token: string , message: string}>(`${this.api}/user`,userData)
  }
}
