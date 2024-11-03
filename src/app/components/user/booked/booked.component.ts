import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IBooking } from '../../../interfaces/booking.interface';
import { BookingService } from '../../../shared/services/booking.service';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule, SearchComponent],
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css'],
})
export class BookedComponent implements OnInit {
  bookings!: IBooking[];
  singleBookedPackage!: IBooking;
  constructor(
    private _bookingService: BookingService,
    private _storageService: LocalStorageService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._storageService.removeItem('_bookingId');
    this._bookingService.getAllBookedPackages().subscribe((res) => {
      console.log(res);
      this.bookings = res.booked;
    });
  }
  viewDetails(id: string) {
    this._storageService.setItem('_bookingId', id);
    this._router.navigate(['/singlebooked']);
  }
}
