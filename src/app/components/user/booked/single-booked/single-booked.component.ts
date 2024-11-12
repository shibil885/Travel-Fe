import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IBooking } from '../../../../interfaces/booking.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ToastService } from '../../../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { BookingService } from '../../../../shared/services/booking.service';
import { TravelConfirmationStatus } from '../../../../enum/travelConfirmation.enum';
import { TravelStatus } from '../../../../enum/travelStatus.enum';
import { HeaderSidebarComponent } from '../../header-and-side-bar/header-and-side-bar.component';

@Component({
  selector: 'app-booking-detail', 
  standalone: true,
  imports: [HeaderSidebarComponent, CommonModule, RouterModule],
  templateUrl: './single-booked.component.html',
  styleUrls: ['./single-booked.component.css'],
})
export class SingleBookedComponent implements OnInit {
  bookingDetails!: IBooking;
  @Output() closePageEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private bookingService: BookingService,
    private storageService: LocalStorageService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const bookingId = this.storageService.getItem('_bookingId');
    if (!bookingId) {
      this.toastService.showToast('Cannot find booking ID', 'error');
      this.router.navigate(['/booked']);
      return;
    }
    this.bookingService.getSingleBookedPackage(bookingId).subscribe({
      next: (res) => {
        if (res.success) {
          this.bookingDetails = res.bookedPackage;
        }
      },
      error: (err) => {
        this.toastService.showToast('Error fetching booking details', 'error');
        console.error('Error:', err);
      },
    });
  }

  onCancel(bookingId: string): void {
    this.bookingService.cancelBooking(bookingId, 'user').subscribe({
      next: (res) => {
        if (res.success) {
          this.bookingDetails.confirmation = TravelConfirmationStatus.REJECTED;
          this.bookingDetails.travel_status = TravelStatus.CANCELLED;
          this.toastService.showToast(res.message, 'success');
        }
      },
      error: (err) => {
        this.toastService.showToast('Error cancelling booking', 'error');
        console.error('Error:', err);
      },
    });
  }
}
