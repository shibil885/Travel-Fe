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
    this._notificationService
      .getNotifications('agency', true)
      .subscribe((res) => {
        console.log('--->', res);
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
