import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../shared/services/notification.service';
import { Notification } from '../../../interfaces/notification.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  filterType: 'all' | 'unread' | 'read' = 'all';
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.errorMessage = null;
    this.notificationService
      .getNotifications()
      .pipe(
        catchError((error) => {
          console.error('Error fetching notifications:', error);
          this.errorMessage = 'Failed to load notifications. Please try again.';
          this.loading = false;
          return of([]);
        })
      )
      .subscribe((data: Notification[]) => {
        this.notifications = data;
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

  markAsRead(notification: Notification) {
    if (!notification.is_read) {
      this.notificationService
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

  deleteNotification(notification: Notification) {
    this.notificationService
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
