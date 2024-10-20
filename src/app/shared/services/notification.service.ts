import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private api = 'http://localhost:3000/notification';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.api}`, {
      withCredentials: true,
    });
  }
  getAllUnreadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.api}/unread`, {
      withCredentials: true,
    });
  }

  getNotificationById(id: string): Observable<Notification> {
    return this.http.get<Notification>(`${this.api}/${id}`, {
      withCredentials: true,
    });
  }

  markAsRead(id: string): Observable<Notification> {
    return this.http.patch<Notification>(
      `${this.api}/${id}/read`,
      {},
      { withCredentials: true }
    );
  }

  deleteNotification(id: string): Observable<Notification> {
    return this.http.patch<Notification>(
      `${this.api}/${id}/delete`,
      {},
      { withCredentials: true }
    );
  }
}
