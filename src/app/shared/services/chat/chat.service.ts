import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgency } from '../../../models/agency.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly _api = 'http://localhost:3000/chat';
  constructor(private _http: HttpClient) {}

  agenciesToChat() {
    return this._http.get<{
      success: boolean;
      message: string;
      agencies: IAgency[];
    }>(`${this._api}/agencies`, { withCredentials: true });
  }
}
