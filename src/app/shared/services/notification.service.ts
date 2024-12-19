import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INotification } from '../../interfaces/notification.interface';
import { Role } from '../../enum/role.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _BASE_URL = import.meta.env.NG_APP_BASE_URL;
  private api = `${this._BASE_URL}/notification`;

  constructor(private http: HttpClient) {}

  getNotifications(
    role: string,
    is_read: boolean = false,
    limit: number = Infinity
  ) {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<{
      success: boolean;
      message: string;
      notifications: INotification[];
    }>(`${this.api}/${role}/${is_read}`, {
      params,
      withCredentials: true,
    });
  }
  getNotificationById(id: string): Observable<Notification> {
    return this.http.get<Notification>(`${this.api}/${id}`, {
      withCredentials: true,
    });
  }

  markAsRead(id: string) {
    return this.http.patch<{ success: boolean; message: string }>(
      `${this.api}/${id}/read`,
      {},
      { withCredentials: true }
    );
  }
  markAllAsRead(role: Role) {
    return this.http.patch<{ success: boolean; message: string }>(
      `${this.api}/markAllAsRead/${role}`,
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
