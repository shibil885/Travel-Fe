import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../../shared/services/booking.service';
import { ToastService } from '../../../../shared/services/toaster.service';
import { IBooking } from '../../../../interfaces/booking.interface';
import { TravelConfirmationStatus } from '../../../../enum/travelConfirmation.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { TravelStatus } from '../../../../enum/travelStatus.enum';

@Component({
  selector: 'app-single-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-booking.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.3s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  styleUrl: './single-booking.component.css',
})
export class SingleBookingComponent implements OnInit {
  @Input() id!: string;
  @Output() closePageEvent = new EventEmitter();

  booking: IBooking | null = null;

  travelStatusOptions = ['pending', 'started', 'completed', 'cancelled'];

  constructor(
    private _bookingService: BookingService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchBookingData();
  }

  fetchBookingData() {
    this._bookingService.getSingleBookedPackage(this.id).subscribe((res) => {
      if (res.success) {
        this.booking = res.bookedPackage;
      }
    });
  }

  confirmBooking() {
    if (!this.booking?._id) {
      this._toastService.showToast('Invalid booking details', 'error');
      return;
    }
    this._bookingService
      .confirmBooking(this.booking._id, TravelConfirmationStatus.CONFIRMED)
      .subscribe((res) => {
        if (res.success) {
          this._toastService.showToast(res.message, 'success');
          this.fetchBookingData();
        }
      });
  }

  cancelBooking(bookingId: string | undefined) {
    if (!bookingId) {
      this._toastService.showToast('Invalid booking ID', 'error');
      return;
    }
    this._bookingService.cancelBooking(bookingId, 'agency').subscribe((res) => {
      if (res.success) {
        if (this.booking) {
          this.booking.confirmation = TravelConfirmationStatus.REJECTED;
        }
        this._toastService.showToast(res.message, 'success');
      }
    });
  }

  closePage() {
    this.closePageEvent.emit();
  }
  onstatusChange(bookingId: string, status: string) {
    this._bookingService.changeStatus(bookingId, status).subscribe((res) => {
      if (res.success) {
        this._toastService.showToast(res.message, 'success');
        this.fetchBookingData();
      }
    });
  }
}
