import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '../../agency/home/stats-card/stats-card.component';
import { AdminDashboardService } from '../../../shared/services/dashboard/admin/admin-dashboard.service';
import { IAgency } from '../../../models/agency.model';
import { FormsModule } from '@angular/forms';
import { IPackage } from '../../../interfaces/package.interface';
import { AgencyFilter } from '../../../enum/agency-filter.enum';
import { PackageFilter } from '../../../enum/package-filter.enum';

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
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isCollapsed = false;
  isMobileMenuOpen = false;
  agencies: IAgency[] = [];
  packages: IPackage[] = [];
  agencyFilter: AgencyFilter = AgencyFilter.NEW_AGENCIES;
  packageFilter: PackageFilter = PackageFilter.TOP_RATED;
  statsItem = [
    { title: 'Users', value: '0', icon: 'users' },
    { title: 'Agencies', value: '0', icon: 'agency' },
    { title: 'Total Packages', value: '0', icon: 'package' },
    { title: 'Bookings', value: '0', icon: 'briefcase' },
    { title: 'Revenue', value: '0', icon: 'rs-sign' },
  ];
  headers = [
    { label: '#', key: '_id' },
    { label: 'name', key: 'name' },
    { label: 'rating', key: 'reviewofagency' },
    { label: 'location', key: 'reviewofagency' },
    { label: 'Total bookings', key: 'bookings' },
  ];

  constructor(private _dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this._fetchTopAgencies();
    this._fetchTopPackages();
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

  private _fetchTopAgencies() {
    this._dashboardService.topAgency(this.agencyFilter).subscribe((res) => {
      if (res.success) {
        this.agencies = res.agencies;
      }
    });
  }

  private _fetchTopPackages() {
    this._dashboardService.topPackages(this.packageFilter).subscribe((res) => {
      if (res.success) {
        console.log(res.packages);
        this.packages = res.packages;
      }
    });
  }


  onAgencyFilter() {
    this._fetchTopAgencies();
  }
  onPackageFilter() {
    console.log('filter', this.packageFilter);
    this._fetchTopPackages();
  }
}
