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

  notificationTypes = ['read', 'unread'];
  selectedFilter = 'all';
  filteredNotifications: INotification[] = this.notifications;

  constructor(
    private _notificationService: NotificationService,
    private _socketService: SocketService
  ) {}

  ngOnInit() {
    this._socketService.bookingConfirmed().subscribe((res) => {
      this._fetchNotifications();
    });

    this._socketService.bookingCancelled().subscribe((res) => {
      this._fetchNotifications();
    });
    this._fetchNotifications();
    this.applyFilter();
  }

  private _fetchNotifications() {
    this._notificationService.getNotifications('user').subscribe((res) => {
      console.log(res);
      this.filteredNotifications = res.notifications;
    });
  }
  filterNotifications(type: string) {
    this.selectedFilter = type;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredNotifications = this.notifications;
    } else {
      this.filteredNotifications = this.notifications.filter(
        (n) => n.type === this.selectedFilter
      );
    }
  }

  markAsRead(notification: any) {
    notification.is_read = true;
  }

  markAllAsRead() {
    this.notifications.forEach((n) => (n.is_read = true));
    this.applyFilter();
  }

  clearNotifications() {
    this.notifications = [];
    this.applyFilter();
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
