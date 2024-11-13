import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { IBooking } from '../../../interfaces/booking.interface';
import { BookingService } from '../../../shared/services/booking.service';
import { SingleBookingComponent } from './single-booking/single-booking.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    CommonModule,
    SearchComponent,
    PaginationComponent,
    SingleBookingComponent,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  bookings: IBooking[] = [];
  singleBooking: IBooking | null = null;
  currentPage: number = 1;
  limit: number = 5;
  totalItems: number = 0;
  renderTableRelatedData = true;
  renderAddForm = false;
  renderSingleBooking = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingService
      .getAllBookedPackagesForAgency(this.currentPage, this.limit)
      .subscribe((response) => {
        this.bookings = response.booking;
        this.totalItems = response.totalItems;
        this.currentPage = response.currentPage;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchBookings();
  }

  addBooking(): void {
    this.renderAddForm = true;
    this.renderTableRelatedData = false;
  }

  onAddFormClosedOrCompleted(): void {
    this.renderAddForm = false;
    this.renderSingleBooking = false;
    this.renderTableRelatedData = true;
    this.fetchBookings();
  }

  viewBookingDetails(booking: IBooking): void {
    console.log('---------->', booking);
    this.singleBooking = booking;
    this.renderSingleBooking = true;
    this.renderTableRelatedData = false;
  }

  cancelBooking(booking: IBooking): void {
    // if (confirm(`Are you sure you want to cancel booking ID: ${booking.id}?`)) {
    //   this.bookingService.cancelBooking(booking.id).subscribe(
    //     () => {
    //       alert('Booking canceled successfully.');
    //       this.fetchBookings(); // Refresh the bookings list
    //     },
    //     (error) => {
    //       console.error('Error canceling booking:', error);
    //     }
    //   );
    // }
  }

  // Search handler for bookings
  onSearch(searchText: string): void {
    //this.bookingService.searchBookings(searchText).subscribe(
    //   (response) => {
    //     this.bookings = response.bookings;
    //     this.totalItems = response.totalItems;
    //   },
    //   (error) => {
    //     console.error('Error searching bookings:', error);
    //   }
    // );
  }
  closeSingleBookingPage() {}
}
