import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { NotificationService } from '../../../shared/services/notification.service';
import { INotification } from '../../../interfaces/notification.interface';
import { SocketService } from '../../../shared/services/socket/socket.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [HeaderSidebarComponent, CommonModule, MatIcon],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  notifications: INotification[] = [];

  notificationTypes = ['unread', 'read'];
  selectedFilter = 'unread';

  constructor(
    private _notificationService: NotificationService,
    private _socketService: SocketService
  ) {}

  ngOnInit() {
    this._socketService.bookingConfirmed().subscribe((res) => {
      this._fetchNotifications(false);
    });

    this._socketService.bookingCancelled().subscribe((res) => {
      this._fetchNotifications(false);
    });
    this._fetchNotifications(false);
  }

  private _fetchNotifications(isRead: boolean) {
    this._notificationService
      .getNotifications('user', isRead)
      .subscribe((res) => {
        console.log(res);
        this.notifications = res.notifications;
      });
  }

  filterNotifications(type: string) {
    if (type === 'unread') {
      this.selectedFilter = type;
      this._fetchNotifications(false);
    } else {
      this.selectedFilter = type;
      this._fetchNotifications(true);
    }
  }

  markAsRead(notification: INotification) {
    this._notificationService.markAsRead(notification._id).subscribe((res) => {
      if (res.success) {
        this._fetchNotifications(false);
      }
    });
  }

  markAllAsRead() {
    this.notifications.forEach((n) => (n.is_read = true));
  }

  getIcon(type: string) {
    switch (type) {
      case 'info':
        return 'info';
      case 'alert':
        return 'warning';
      case 'error':
        return 'error';
      case 'success':
        return 'check_circle';
      default:
        return 'notifications';
    }
  }
}
