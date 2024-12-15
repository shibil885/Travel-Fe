import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgency } from '../../../models/agency.model';
import { MessageSenderType } from '../../../enum/messageSenderType.enum';
import { IChat } from '../../../interfaces/chat.interface';
import { tap } from 'rxjs';
import { IUser } from '../../../models/user.model';
import { IMessage } from '../../../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly _api = 'http://localhost:3000/chat';
  constructor(private _http: HttpClient) {}

  getAllChats(userType: MessageSenderType) {
    const params = new HttpParams().set('userType', userType);
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.get<{
      success: boolean;
      message: string;
      chats: IChat[];
    }>(`${this._api}`, {
      params,
      headers,
      withCredentials: true,
    });
  }

  getAllMessages(chatId: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.get<{
      success: boolean;
      message: string;
      messages: IMessage[];
    }>(`${this._api}/messages/${chatId}`, {
      headers,
      withCredentials: true,
    });
  }

  usersOrAgenciesToChat() {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.get<{
      success: boolean;
      message: string;
      users: (IAgency | IUser)[];
    }>(`${this._api}/users`, { headers, withCredentials: true });
  }

  initializeChat(id: string, userType: MessageSenderType) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http
      .post<{ success: boolean; message: string; chat: IChat }>(
        `${this._api}/initialize`,
        { id, userType },
        { headers, withCredentials: true }
      )
      .pipe(
        tap((res) => {
          console.log('log from tap initialize', res);
        })
      );
  }

  addMessage(chatId: string, content: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/addMessage/${chatId}`,
      { content },
      { headers, withCredentials: true }
    );
  }

  makeAllMessageAsRead(chatId: string, userType: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/makeMessageRead`,
      { chatId, userType },
      { headers, withCredentials: true }
    );
  }
}
