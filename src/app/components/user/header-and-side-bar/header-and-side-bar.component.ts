import { Component, signal, HostListener, ElementRef } from '@angular/core';
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
import { INotification } from '../../../interfaces/notification.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { SocketService } from '../../../shared/services/socket/socket.service';
import { UserService } from '../../../shared/services/user.service';

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
    private elementRef: ElementRef,
    private _notificationService: NotificationService,
    private _socketService: SocketService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._socketService.bookingConfirmed().subscribe(() => {
      this._fetchNotification();
    });

    this._socketService.bookingCancelled().subscribe(() => {
      this._fetchNotification();
    });

    this._fetchNotification();
    this._fetchUserData();
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  private _fetchNotification() {
    this._notificationService
      .getNotifications('user', false, 6)
      .subscribe((res) => {
        this.notifications = res.notifications;
        this.notificationCount = res.notifications.length;
      });
  }
  private _fetchUserData() {
    this._userService.getUserData().subscribe((res) => {
      this.user = res.user;
    });
  }

  markAsRead(notification: INotification): void {
    // Implement mark as read logic
  }

  toggleSidebar() {
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.isMenuOpen = false;
      this.isModalOpen = false;
    }
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isModalOpen = false;
      this.isOpen.set(false);
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    if (this.isModalOpen) {
      this.isMenuOpen = false;
      this.isOpen.set(false);
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isClickInsideHeader = this.elementRef.nativeElement.contains(target);

    if (!isClickInsideHeader) {
      this.isMenuOpen = false;
      this.isModalOpen = false;
    }
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
