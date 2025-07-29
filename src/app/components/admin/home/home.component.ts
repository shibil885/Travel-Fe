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
import { IPackage } from '../../../interfaces/package/package.interface';
import { AgencyFilter } from '../../../enum/agency-filter.enum';
import { PackageFilter } from '../../../enum/package-filter.enum';
import { ReportFilter } from '../../../enum/reportFilter.enum';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import { IBooking, IReport } from '../../../interfaces';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

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
  bookings: IBooking[] = [];
  reports: IReport[] = [];
  agencyFilter: AgencyFilter = AgencyFilter.NEW_AGENCIES;
  packageFilter: PackageFilter = PackageFilter.TOP_RATED;
  reportFilter: ReportFilter = ReportFilter.RECENT_REPORTS;
  startDate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
  endDate: Date = new Date();
  isValid: boolean = false;
  errorMessage: string = '';
  reportType: string = 'all';
  bookingTrendsChart: Chart | null = null;
  selectedGroupBy: 'month' | 'year' = 'month';

  statsItem = [
    { title: 'Users', value: '0', icon: 'users' },
    { title: 'Agencies', value: '0', icon: 'agency' },
    { title: 'Total Packages', value: '0', icon: 'package' },
    { title: 'Bookings', value: '0', icon: 'briefcase' },
    { title: 'Revenue', value: '0', icon: 'rs-sign' },
  ];

  headers = [
    { label: '#', key: '_id' },
    { label: 'Name', key: 'name' },
    { label: 'Rating', key: 'reviewofagency' },
    { label: 'Location', key: 'location' },
    { label: 'Total Bookings', key: 'bookings' },
  ];

  reportHeaders = [
    { label: '#', key: '_id' },
    { label: 'Report Title', key: 'title' },
    { label: 'Reported By', key: 'reportedBy' },
    { label: 'Status', key: 'status' },
    { label: 'Date', key: 'createdAt' },
  ];

  constructor(private _dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchStats();
    this.fetchTopAgencies();
    this.fetchTopPackages();
    this.fetchReports();
    this.initializeBookingTrendsChart();
    this.fetchBookingTrends();
    this._fetchRevenue()
  }
  private _fetchRevenue() {
    this._dashboardService.revenue().subscribe((res) => {
      this.statsItem[4].value = res.result.toString();
    });
  }
  fetchStats() {
    this._dashboardService.statasCard().subscribe({
      next: (res) => {
        this.statsItem[0].value = String(res.result.users);
        this.statsItem[1].value = String(res.result.agencies);
        this.statsItem[2].value = String(res.result.packages);
        this.statsItem[3].value = String(res.result.bookings);
      },
      error: (err) => {
        console.error('Error fetching stats:', err);
      },
    });
  }

  fetchTopAgencies() {
    this._dashboardService.topAgency(this.agencyFilter).subscribe({
      next: (res) => {
        if (res.success) {
          this.agencies = res.agencies;
        }
      },
      error: (err) => {
        console.error('Error fetching top agencies:', err);
      },
    });
  }

  fetchTopPackages() {
    this._dashboardService.topPackages(this.packageFilter).subscribe({
      next: (res) => {
        if (res.success) {
          this.packages = res.packages;
        }
      },
      error: (err) => {
        console.error('Error fetching top packages:', err);
      },
    });
  }

  fetchReports() {
    this._dashboardService
      .generateReport(this.startDate, this.endDate)
      .subscribe((res) => {
        this.bookings = res.report;
        console.log('--->', res);
      });
  }

  validateDates() {
    if (!this.startDate || !this.endDate) {
      this.isValid = false;
      this.errorMessage = 'Both dates must be selected.';
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    if (start > end) {
      this.isValid = false;
      this.errorMessage = 'Start Date cannot be after End Date.';
    } else {
      this.isValid = true;
      this.errorMessage = '';
    }
  }

  initializeBookingTrendsChart(): void {
    const canvas = document.getElementById(
      'bookingTrendsChart'
    ) as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
    if (this.bookingTrendsChart) {
      this.bookingTrendsChart.destroy();
    }
    this.bookingTrendsChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: 'rgba(61, 82, 160, 0.2)',
            borderColor: '#3D52A0',
            borderWidth: 2,
            pointBackgroundColor: '#7091E6',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Months or Years' },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Bookings' },
          },
        },
      },
    });
  }

  fetchBookingTrends() {
    this._dashboardService.getBookingTrends(this.selectedGroupBy).subscribe({
      next: (res) => {
        const labels = res.data.map((item) =>
          this.selectedGroupBy === 'month'
            ? `${item.month} ${item.year}`
            : `${item.year}`
        );
        const bookingCounts = res.data.map((item) => item.bookings);

        if (this.bookingTrendsChart) {
          this.bookingTrendsChart.data.labels = labels;
          this.bookingTrendsChart.data.datasets[0].data = bookingCounts;
          this.bookingTrendsChart.update();
        }
      },
      error: (err) => {
        console.error('Error fetching booking trends:', err);
      },
    });
  }

  onAgencyFilterChange() {
    this.fetchTopAgencies();
  }

  onPackageFilterChange() {
    this.fetchTopPackages();
  }

  onFilterChange() {
    this.fetchReports();
  }
  onChangeToYeart() {
    if (this.selectedGroupBy == 'year') {
      return;
    }
    this.selectedGroupBy = 'year';
    this.fetchBookingTrends();
  }
  onChangeToMonth() {
    if (this.selectedGroupBy == 'month') {
      return;
    }
    this.selectedGroupBy = 'month';
    this.fetchBookingTrends();
  }
}
