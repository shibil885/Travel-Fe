import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransaction, IWallet } from '../../interfaces/wallet.interface';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getOrCreateUserWallet(): Observable<IWallet> {
    return this.http.get<IWallet>(`${this.api}/wallet`, {
      withCredentials: true,
    });
  }
}
