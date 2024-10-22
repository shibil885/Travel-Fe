import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/agency/agency.action';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  isCollapsed = false;
  menuItems = [
    {
      label: 'Dashboard',
      route: '/agency/home',
      icon: 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
    },
    {
      label: 'Packages',
      route: '/agency/packages',
      icon: 'm21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
    },
  ];

  constructor(private store: Store) {}
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  logout() {
    this.store.dispatch(logout());
  }
}
