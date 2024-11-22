import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransaction, IWallet } from '../../interfaces/wallet.interface';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private _api = 'http://localhost:3000';

  constructor(private _http: HttpClient) {}

  getOrCreateUserWallet(): Observable<IWallet> {
    return this._http.get<IWallet>(`${this._api}/wallet`, {
      withCredentials: true,
    });
  }
}
