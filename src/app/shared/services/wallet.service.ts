import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../Environment/environment';
import { IWallet } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private readonly _BASE_URL = environment.apiUrl;
  private _api = this._BASE_URL;

  constructor(private _http: HttpClient) {}

  getOrCreateUserWallet(): Observable<IWallet> {
    return this._http.get<IWallet>(`${this._api}/wallet`, {
      withCredentials: true,
    });
  }
  getOrCreateAdminWallet(): Observable<IWallet> {
    return this._http.get<IWallet>(`${this._api}/wallet/admin`, {
      withCredentials: true,
    });
  }
}
