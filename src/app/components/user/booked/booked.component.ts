import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IBooking } from '../../../interfaces/booking.interface';
import { BookingService } from '../../../shared/services/booking.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderSidebarComponent,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css'],
})
export class BookedComponent implements OnInit {
  bookings: IBooking[] = [];
  limit: number = 5;
  currentPage: number = 1;
  totalPackages: number = 0;

  constructor(
    private bookingService: BookingService,
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchBookings();
    this.storageService.removeItem('_bookingId');
  }

  fetchBookings() {
    this.bookingService
      .getAllBookedPackages(this.currentPage, this.limit)
      .subscribe((res) => {
        this.bookings = res.booked;
        this.totalPackages = res.totalItems;
        this.currentPage = res.currentPage;
      });
  }

  viewDetails(id: string) {
    this.storageService.setItem('_bookingId', id);
    this.router.navigate(['/singlebooked']);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchBookings();
  }

  onSearch(searchTerm: Event) {
    console.log('Searching for:', searchTerm);
  }
}
