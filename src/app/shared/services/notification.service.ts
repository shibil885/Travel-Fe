import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INotification } from '../../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private api = 'http://localhost:3000/notification';

  constructor(private http: HttpClient) {}

  getNotifications(role: string, limit: number= Infinity) {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<{
      success: boolean;
      message: string;
      notifications: INotification[];
    }>(`${this.api}/${role}`, {
      params,
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
