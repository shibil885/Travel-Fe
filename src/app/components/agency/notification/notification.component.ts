import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { INotification } from '../../../interfaces/notification.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [SideBarComponent, HeaderComponent, CommonModule, MatIcon],
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
    this._socketService.userBookedNewPackage().subscribe(() => {
      this._fetchNotifications(false);
    });
    this._fetchNotifications(false);
  }

  private _fetchNotifications(isRead: boolean) {
    this._notificationService
      .getNotifications('agency', isRead)
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
