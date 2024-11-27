import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IBooking } from '../../../../interfaces/booking.interface';
import { AgencyDashboardService } from '../../../../shared/services/dashboard/agency/agency-dashboard.service';

@Component({
  selector: 'app-recent-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-booking.component.html',
  styleUrl: './recent-booking.component.css',
})
export class RecentBookingComponent {
  recentBookings: IBooking[] = [];

  constructor(
    private readonly _AgencyDashboardService: AgencyDashboardService
  ) {}

  ngOnInit(): void {
    this._AgencyDashboardService.getRecentBookings().subscribe((res) => {
      this.recentBookings = res.bookings
    })
  }
}
