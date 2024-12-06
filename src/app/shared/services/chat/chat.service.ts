import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgency } from '../../../models/agency.model';
import { MessageSenderType } from '../../../enum/messageSenderType.enum';
import { IChat } from '../../../interfaces/chat.interface';
import { tap } from 'rxjs';
import { IUser } from '../../../models/user.model';
import { IMessage } from '../../../interfaces/message.interface';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly _api = 'http://localhost:3000/chat';
  constructor(private _http: HttpClient, private _socket: Socket) {}

  getAllChats(userType: MessageSenderType) {
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

  getAllMessages(chatId: string) {
    return this._http.get<{
      success: boolean;
      message: string;
      messages: IMessage[];
    }>(`${this._api}/messages/${chatId}`, {
      withCredentials: true,
    });
  }

  usersOrAgenciesToChat() {
    return this._http.get<{
      success: boolean;
      message: string;
      users: (IAgency | IUser)[];
    }>(`${this._api}/users`, { withCredentials: true });
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
          console.log('log from tap initialize', res);
        })
      );
  }

  addMessage(chatId: string, content: string) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/addMessage/${chatId}`,
      { content },
      { withCredentials: true }
    );
  }

  makeAllMessageAsRead(chatId: string, userType: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/makeMessageRead`,
      { chatId,userType },
      { withCredentials: true }
    );
  }

  joinChat(chatId: string) {
    this._socket.emit('joinChat', { chatId });
  }

  receiveMessages() {
    return this._socket.fromEvent<IMessage>('message');
  }

  leaveChat(chatId: string) {
    this._socket.emit('leaveChat', { chatId });
  }
}
