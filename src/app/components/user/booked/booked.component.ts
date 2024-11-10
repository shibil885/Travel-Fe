import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IBooking } from '../../../interfaces/booking.interface';
import { BookingService } from '../../../shared/services/booking.service';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    SearchComponent,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css'],
})
export class BookedComponent {
  bookings!: IBooking[];
  limit: number = 5;
  currenPage: number = 1;
  totalPackages!: number;
  singleBookedPackage!: IBooking;

  constructor(
    private _bookingService: BookingService,
    private _storageService: LocalStorageService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.fetchbookings();
    this._storageService.removeItem('_bookingId');
  }
  fetchbookings() {
    this._bookingService
      .getAllBookedPackages(this.currenPage, this.limit)
      .subscribe((res) => {
        this.bookings = res.booked;
        this.totalPackages = res.totalItems;
        this.currenPage = res.currentPage;
      });
  }
  viewDetails(id: string) {
    this._storageService.setItem('_bookingId', id);
    this._router.navigate(['/singlebooked']);
  }
  onPageChange(page: number) {
    this.currenPage = page;
    this.fetchbookings();
  }
}
