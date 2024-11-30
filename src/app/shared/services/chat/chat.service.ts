import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgency } from '../../../models/agency.model';
import { MessageSenderType } from '../../../enum/messageSenderType.enum';
import { IChat } from '../../../interfaces/chat.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly _api = 'http://localhost:3000/chat';
  constructor(private _http: HttpClient) {}

  getAllChats(userType: MessageSenderType) {
    console.log('user type', userType);
    const params = new HttpParams().set('userType', userType);
    return this._http.get<{
      success: boolean;
      message: string;
      chats: IChat[];
    }>(`${this._api}`, {
      params,
      withCredentials: true,
    });
  }

  agenciesToChat() {
    return this._http.get<{
      success: boolean;
      message: string;
      agencies: IAgency[];
    }>(`${this._api}/agencies`, { withCredentials: true });
  }

  initializeChat(id: string, userType: MessageSenderType) {
    return this._http
      .post<{ success: boolean; message: string; chat: IChat }>(
        `${this._api}/initialize`,
        { id, userType },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          console.log('log from tap', res);
        })
      );
  }
}
