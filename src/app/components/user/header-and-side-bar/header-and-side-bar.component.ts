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
  template: `
    <header class="rounded-br-3xl rounded-bl-3xl sticky top-0 z-50 bg-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-gray-800 cursor-pointer" (click)="toggleMenu()">
          Travel
        </div>
        <nav class="hidden md:flex space-x-6 ml-5">
            <a [routerLink]="['/home']" class="text-gray-800 hover:text-indigo-600">Home</a>
            <a [routerLink]='["/agencies" ]' class="text-gray-800 hover:text-indigo-600">Agencies</a>
            <a [routerLink]='["/packages"]' class="text-gray-800 hover:text-indigo-600">Packages</a>
            <a [routerLink]='["/contact" ]'class="text-gray-800 hover:text-indigo-600">Contact</a>
        </nav>  
        <button class="md:hidden text-gray-600 focus:outline-none" (click)="toggleMenu()">
          <mat-icon>{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
        </button>
        <nav
          class=" md:hidden space-x-6"
          *ngIf="isMenuOpen || windowWidth > 768"
          [@expandCollapse]="isMenuOpen ? 'expanded' : 'collapsed'"
        >
          <a [routerLink]="['/home']" class="text-gray-800 hover:text-indigo-600">Home</a>
          <a [routerLink]="['/agencies']" class="text-gray-800 hover:text-indigo-600">Agencies</a>
          <a [routerLink]="['/packages']" class="text-gray-800 hover:text-indigo-600">Packages</a>
          <a [routerLink]="['/contact']" class="text-gray-800 hover:text-indigo-600">Contact</a>
        </nav>
        <button class="profile-toggle" (click)="toggleSidebar()" aria-label="Toggle user profile sidebar">
          <img src="https://github.com/shadcn.png" alt="User avatar" class="avatar w-10 h-10 rounded-full" />
        </button>
      </div>
    </header>

    <div class="overlay" [class.active]="isOpen()" (click)="toggleSidebar()" aria-hidden="true"></div>

    <aside class="sidebar" [class.active]="isOpen()" aria-hidden="!isOpen()">
      <div class="sidebar-content">
        <div class="user-info">
          <img src="https://github.com/shadcn.png" alt="User avatar" class="avatar large" />
          <h2>{{ user?.username }}</h2>
          <p>{{ user?.email }}</p>
        </div>
        <button class="view-profile-btn">View Profile</button>
        <nav>
          <ul>
            <li *ngFor="let item of menuItems">
              <a [routerLink]="item.route" class="menu-item" (click)="toggleSidebar()">
                <i class="material-icons">{{ item.icon }}</i>
                <span>{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </nav>
        <button class="logout-btn" (click)="userLogout()">Logout</button>
        <div class="footer">
          <p>&copy; 2024 Travel App. All rights reserved.</p>
        </div>
      </div>
    </aside>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
      header {
        transition: all 0.3s ease-in-out;
      }
      .profile-toggle {
        background: none;
        border: none;
        cursor: pointer;
        transition: transform 0.3s ease;
      }
      .profile-toggle:hover {
        transform: scale(1.1);
      }
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 999;
      }
      .overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        max-width: 300px;
        background-color: #ffffff;
        color: #333;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        overflow-y: auto;
        transform: translateX(100%);
        transition: transform 0.4s ease;
      }
      .sidebar.active {
        transform: translateX(0);
      }
      .sidebar-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 2rem;
      }
      .user-info {
        text-align: center;
        margin-bottom: 2rem;
      }
      .user-info .avatar.large {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
      .view-profile-btn,
      .logout-btn {
        background-color: #3d52a0;
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        width: 100%;
        margin-bottom: 1rem;
      }
      .logout-btn {
        background-color: #dc3545;
      }
      nav ul {
        list-style-type: none;
        padding: 0;
      }
      .menu-item {
        display: flex;
        align-items: center;
        padding: 0.75rem 0;
        color: #333;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      .menu-item:hover {
        background-color: #f0f0f0;
      }
      .menu-item i {
        margin-right: 0.75rem;
        color: #3d52a0;
      }
    `,
  ],
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
    { icon: 'notifications', label: 'Notifications', route: '/notifications' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'help', label: 'Help', route: '/help' },
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
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    if (this.windowWidth > 768) {
      this.isMenuOpen = false;
    }
  }

  userLogout(): void {
    this.store.dispatch(logout());
    this.toggleSidebar();
  }
}
