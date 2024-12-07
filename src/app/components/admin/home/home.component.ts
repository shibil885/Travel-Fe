import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '../../agency/home/stats-card/stats-card.component';
import { AdminDashboardService } from '../../../shared/services/dashboard/admin/admin-dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    StatsCardComponent,
    MatIconModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isCollapsed = false;
  isMobileMenuOpen = false;
  statsItem = [
    { title: 'Users', value: '0', icon: 'users' },
    { title: 'Agencies', value: '0', icon: 'agency' },
    { title: 'Total Packages', value: '0', icon: 'package' },
    { title: 'Bookings', value: '0', icon: 'briefcase' },
    { title: 'Revenue', value: '0', icon: 'rs-sign' },
  ];

  agencies = [
    {
      name: 'Sky Travels',
      firstName: 'Sky',
      email: 'contact@skytravels.com',
      joinedDate: '2023-12-01',
      isActive: true,
      isConfirmed: false,
    },
    {
      name: 'Oceanic Tours',
      firstName: 'Oceanic',
      email: 'hello@oceanictours.com',
      joinedDate: '2023-11-15',
      isActive: false,
      isConfirmed: true,
    },
  ];

  constructor(private _dashboardService: AdminDashboardService) {}
  ngOnInit(): void {
    this._dashboardService.statasCard().subscribe((res) => {
      this.statsItem[0].value = String(res.result.users);
      this.statsItem[1].value = String(res.result.agencies);
      this.statsItem[2].value = String(res.result.packages);
      this.statsItem[3].value = String(res.result.bookings);
    });
    this._dashboardService.revenue().subscribe((res) => {
      this.statsItem[4].value = String(res.result);
    });
  }
}
