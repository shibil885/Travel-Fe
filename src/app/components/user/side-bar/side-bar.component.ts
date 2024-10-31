import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../../../store/user/user.selector';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(100%)',
        })
      ),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SideBarComponent {
  isOpen = signal(false);
  user!:IUser | null;
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
      this.user = user
    })
  }
  toggleSidebar() {
    this.isOpen.update((v) => !v);
  }
}
