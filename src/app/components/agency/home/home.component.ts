import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { AgencyService } from '../../../shared/services/agency.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { RecentBookingComponent } from './recent-booking/recent-booking.component';
import { CurrentTravellingsComponent } from './current-travellings/current-travellings.component';
import { AgencyDashboardService } from '../../../shared/services/dashboard/agency/agency-dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SideBarComponent,
    HeaderComponent,
    StatsCardComponent,
    CommonModule,
    MatIconModule,
    RecentBookingComponent,
    // NewCategoriesComponent,
    CurrentTravellingsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isConfirmed!: boolean;
  statsItem = [
    { title: 'Total Packages', value: '0', icon: 'package' },
    { title: 'Bookings', value: '0', icon: 'briefcase' },
    { title: 'Revenue', value: '0', icon: 'rs-sign' },
  ];

  constructor(
    private _agencyService: AgencyService,
    private _store: Store,
    private readonly _agencyDashboardService: AgencyDashboardService
  ) {}
  ngOnInit(): void {
    this._agencyService.isConfirmed().subscribe((status) => {
      status ? (this.isConfirmed = status) : false;
    });
    if (this.isConfirmed) {
      this._agencyDashboardService.getStatsdata().subscribe((res) => {
        for (let i = 0; i < this.statsItem.length; i++) {
          if (this.statsItem[i].icon === 'package') {
            this.statsItem[i].value = res.packagesCount;
          } else if (this.statsItem[i].icon === 'briefcase') {
            this.statsItem[i].value = res.totalBookings;
          } else if (this.statsItem[i].icon === 'rs-sign') {
            this.statsItem[i].value = res.totalRevenue;
          }
        }
      });
    }
  }
}
