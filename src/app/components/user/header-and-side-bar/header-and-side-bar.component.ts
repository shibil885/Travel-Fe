import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/user/user.action';
import { selectUser } from '../../../store/user/user.selector';
import { IUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './header-and-side-bar.component.html',
  styleUrls: ['./header-and-side-bar.component.css'],
})
export class HeaderAndSideBarComponent {
  isSidebarOpen = signal(false);
  user!: IUser | null;
  menuItems = [
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'book', label: 'Booked', route: '/booked' },
    { icon: 'account_balance_wallet', label: 'Wallet', route: '/wallet' },
    { icon: 'notifications', label: 'Notifications', route: '/notifications' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'help', label: 'Help', route: '/help' },
    { icon: 'logout', label: 'Logout', route: '/logout' },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((v) => !v);
  }

  userLogout(): void {
    console.log('User is logging out');
    this.store.dispatch(logout());
  }
}
