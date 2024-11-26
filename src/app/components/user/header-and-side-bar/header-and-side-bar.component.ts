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
  windowWidth = window.innerWidth;
  user: IUser | null = null;
  menuItems = [
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'book', label: 'Booked', route: '/booked' },
    { icon: 'account_balance_wallet', label: 'Wallet', route: '/wallet' },
    { icon: 'library_add', label: 'Uploads', route: '/uploads' },
    { icon: 'notifications', label: 'Notifications', route: '/notifications' },
    { icon: 'chat', label: 'Chat', route: '/chat' },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  toggleSidebar() {
    this.isOpen.update((v) => !v);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
