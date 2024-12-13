import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/user/user.selector';
import { IUser } from '../../../models/user.model';
import { logout } from '../../../store/user/user.action';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { INotification } from '../../../interfaces/notification.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { SocketService } from '../../../shared/services/socket/socket.service';

@Component({
  selector: 'app-header-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './header-and-side-bar.component.html',
  styleUrls: ['./header-and-side-bar.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HeaderSidebarComponent {
  isOpen = signal(false);
  isMenuOpen = false;
  isModalOpen = false;
  windowWidth = window.innerWidth;
  user: IUser | null = null;
  notificationCount: number = 0;
  notifications: INotification[] = [];
  menuItems = [
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'book', label: 'Booked', route: '/booked' },
    { icon: 'history', label: 'Travel history', route: '/travelHistory' },
    { icon: 'account_balance_wallet', label: 'Wallet', route: '/wallet' },
    { icon: 'library_add', label: 'Uploads', route: '/uploads' },
    { icon: 'notifications', label: 'Notifications', route: '/notifications' },
    { icon: 'chat', label: 'Chat', route: '/chat' },
  ];

  constructor(
    private store: Store,
    private _notificationService: NotificationService,
    private _socketService: SocketService
  ) {}

  ngOnInit(): void {
    this._socketService.bookingConfirmed().subscribe((res) => {
      this._fetchNotification();
    });

    this._socketService.bookingCancelled().subscribe((res) => {
      this._fetchNotification();
    });

    this._fetchNotification();

    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  private _fetchNotification() {
    this._notificationService.getNotifications('user',false, 5).subscribe((res) => {
      this.notifications = res.notifications;
      this.notificationCount = res.notifications.length;
    });
  }

  markAsRead(notification: INotification): void {}

  toggleSidebar() {
    this.isOpen.update((v) => !v);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const target = event.target as Window;
    this.windowWidth = target.innerWidth;
    if (this.windowWidth > 768) {
      this.isMenuOpen = false;
    }
  }

  userLogout(): void {
    this.store.dispatch(logout());
    this.toggleSidebar();
  }
}
