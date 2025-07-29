import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../shared/services/notification.service';
import { INotification } from '../../../interfaces/common/notification.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../../enum/role.enum';
import { ToastService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule, MatIconModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  notifications: INotification[] = [];
  filteredNotifications: INotification[] = [];
  filterType: 'all' | 'unread' | 'read' = 'all';
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private _notificationService: NotificationService,
    private _socket: SocketService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this._socket.userBookedNewPackage().subscribe(() => {
      this.loadNotifications();
    });
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.errorMessage = null;
    this._notificationService
      .getNotifications('admin', false)
      .subscribe((data) => {
        this.notifications = data.notifications;
        this.applyFilter();
        this.loading = false;
      });
  }

  applyFilter() {
    switch (this.filterType) {
      case 'unread':
        this.filteredNotifications = this.notifications.filter(
          (n) => !n.is_read
        );
        break;
      case 'read':
        this.filteredNotifications = this.notifications.filter(
          (n) => n.is_read
        );
        break;
      default:
        this.filteredNotifications = this.notifications;
    }
  }

  markAsRead(notification: INotification) {
    if (!notification.is_read) {
      this._notificationService
        .markAsRead(notification._id)
        .pipe(
          catchError((error) => {
            console.error('Error marking notification as read:', error);
            this.errorMessage = 'Failed to mark notification as read.';
            return of(null);
          })
        )
        .subscribe(() => {
          notification.is_read = true;
          notification.read_at = new Date();
          this.applyFilter();
        });
    }
  }

  markAllAsRead() {
    this._notificationService.markAllAsRead(Role.ADMIN).subscribe((res) => {
      if (res.success) {
        this._toastService.showToast(res.message, 'success');
        this.applyFilter();
      }
    });
  }

  deleteNotification(notification: INotification) {
    this._notificationService
      .deleteNotification(notification._id)
      .pipe(
        catchError((error) => {
          console.error('Error deleting notification:', error);
          this.errorMessage = 'Failed to delete notification.';
          return of(null);
        })
      )
      .subscribe(() => {
        this.notifications = this.notifications.filter(
          (n) => n._id !== notification._id
        );
        this.applyFilter();
      });
  }
}
