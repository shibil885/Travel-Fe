import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/user/user.action';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(private _store: Store) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  userLogout(): void {
    console.log('User is logging out');
    this._store.dispatch(logout());
  }
}
