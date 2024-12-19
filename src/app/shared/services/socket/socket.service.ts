import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { IMessage } from '../../../interfaces/message.interface';
import { Observable } from 'rxjs';
import { INotification } from '../../../interfaces/notification.interface';
import { IPackage } from '../../../interfaces/package.interface';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly _BASE_URL = import.meta.env.NG_APP_BASE_URL;
  private _socket: Socket;

  constructor() {
    this._socket = io(this._BASE_URL, {
      withCredentials: true,
    });

    this._socket.on('connect', () => {
      console.log('Connected to the backend server');
    });

    this._socket.on('disconnect', () => {
      console.log('Disconnected from the backend server');
    });
  }

  joinRooms(chats: string[]) {
    console.log('Room created for all chats');
    this._socket.emit('joinRoom', chats);
  }

  receiveMessages() {
    return new Observable<IMessage>((observer) => {
      this._socket.on('message', (message: IMessage) => {
        observer.next(message);
      });
      return () => this._socket.off('message');
    });
  }

  agencyReadAllMessages() {
    return new Observable<{ chatId: string }>((observer) => {
      this._socket.on('agencyReadAllMessages', (data: { chatId: string }) => {
        observer.next(data);
      });
      return () => this._socket.off('agencyReadAllMessages');
    });
  }

  userReadAllMessages() {
    return new Observable<{ chatId: string }>((observer) => {
      this._socket.on('userReadAllMessages', (data: { chatId: string }) => {
        observer.next(data);
      });
      return () => this._socket.off('userReadAllMessages');
    });
  }

  userLoged(userId: string) {
    this._socket.emit('userLoged', userId);
  }
  agencyLoged(userId: string) {
    this._socket.emit('agencyLoged', userId);
  }
  adminLoged(userId: string) {
    this._socket.emit('adminLoged', userId);
  }
  bookingConfirmed() {
    return new Observable<INotification>((observer) => {
      this._socket.on('bookingConfirmed', (data: INotification) => {
        observer.next(data);
      });
      return () => this._socket.off('bookingConfirmed');
    });
  }

  bookingCancelled() {
    return new Observable<INotification>((observer) => {
      this._socket.on('bookingCancelled', (data: INotification) => {
        observer.next(data);
      });
      return () => this._socket.off('bookingCancelled');
    });
  }

  userBookedNewPackage() {
    return new Observable<IPackage>((observer) => {
      this._socket.on('userBookedNewPackage', (data: IPackage) => {
        observer.next(data);
      });
      return () => this._socket.off('userBookedNewPackage');
    });
  }
}
