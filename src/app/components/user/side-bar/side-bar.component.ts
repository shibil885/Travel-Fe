import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
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
          transform: 'translateX(-100%)',
        })
      ),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SideBarComponent {
  isOpen = false;
  menuItems = [
    { icon: 'person', label: 'Profile' },
    { icon: 'book', label: 'Bookings' },
    { icon: 'account_balance_wallet', label: 'Wallet' },
    { icon: 'settings', label: 'Settings' },
    { icon: 'help', label: 'Help' },
    { icon: 'exit_to_app', label: 'Logout' },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
