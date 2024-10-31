import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { BookingService } from '../../../shared/services/booking.service';
import { IBooking } from '../../../interfaces/booking.interface';
import { SingleBookedComponent } from './single-booked/single-booked.component';
import { ToastService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SideBarComponent,
    SingleBookedComponent,
  ],
  templateUrl: './booked.component.html',
  styles: [
    `
      :host {
        display: block;
        background-color: #f3f4f6;
        min-height: 100vh;
      }
    `,
  ],
})
export class BookedComponent {
  bookings: IBooking[] = [];
  singleBookedPackage!: IBooking;
  renderBookedList: boolean = true;

  constructor(
    private bookingService: BookingService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.bookingService.getAllBookedPackages().subscribe((res) => {
      console.log(res);
      this.bookings = res.booked;
    });
  }
  showSingleBooking(id: string) {
    this.bookingService.getSingleBookedPackage(id).subscribe((res) => {
      if (res.success) {
        this.singleBookedPackage = res.bookedPackage;
        this.renderBookedList = !this.renderBookedList;
        return;
      }
      this.toastService.showToast('Somthing Went Wrong', 'error');
      return;
    });
  }
  closeSingleBookedPAckagePage() {
    this.renderBookedList = !this.renderBookedList;
  }
}
