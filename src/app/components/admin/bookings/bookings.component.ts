import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../shared/services/booking.service';
import { IAgency } from '../../../models/agency.model';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { IAgencyBookingData } from '../../../interfaces/agencyBookingsData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    SearchComponent,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  bookingsByAgencies: IAgencyBookingData[] = [];
  limit: number = 6;
  totalItems: number = 0;
  currentPage: number = 1;
  colours: string[] = [
    'bg-gradient-to-r from-indigo-500 to-purple-600',
    'bg-gradient-to-r from-blue-500 to-teal-600',
    'bg-gradient-to-r from-pink-500 to-red-600',
    'bg-gradient-to-r from-green-500 to-emerald-600',
    'bg-gradient-to-r from-yellow-500 to-orange-600',
    'bg-gradient-to-r from-blue-200 to-cyan-200',
  ];
  constructor(
    private _bookingService: BookingService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._fetchBookingsByAgencies();
  }

  private _fetchBookingsByAgencies() {
    this._bookingService
      .getBookingsByAgencies(this.currentPage, this.limit)
      .subscribe((res) => {
        if (res.success) {
          this.bookingsByAgencies = res.data;
          this.totalItems = res.totalItems;
          this.currentPage = res.currentPage;
        }
      });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this._fetchBookingsByAgencies();
  }
  getColors(cuurrentIndex: number) {
    return this.colours[cuurrentIndex % this.colours.length];
  }
  viewBookings(index: number) {
    console.log(this.bookingsByAgencies[index]);
    this._router.navigate([
      `/admin/bookingsByAgency/${this.bookingsByAgencies[index].id}`,
    ]);
  }
}
