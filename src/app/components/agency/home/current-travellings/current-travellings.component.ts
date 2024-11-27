import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IBooking } from '../../../../interfaces/booking.interface';
import { AgencyDashboardService } from '../../../../shared/services/dashboard/agency/agency-dashboard.service';

@Component({
  selector: 'app-current-travellings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-travellings.component.html',
  styleUrl: './current-travellings.component.css',
})
export class CurrentTravellingsComponent {
  currentTravellings: IBooking[] = [];

  constructor(
    private readonly _AgencyDashboardService: AgencyDashboardService
  ) {}

  ngOnInit(): void {
    this._AgencyDashboardService.getCurrentTravellings().subscribe((res) => {
      this.currentTravellings = res.bookings;
    });
  }
}
