import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBooking } from '../../../../interfaces/booking.interface';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../../../shared/services/booking.service';
import { ToastService } from '../../../../shared/services/toaster.service';

@Component({
  selector: 'app-single-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-booking.component.html',
  styleUrl: './single-booking.component.css',
})
export class SingleBookingComponent {
  booking!: IBooking | null;
  @Input() id!: string;
  @Output() closePageEvent = new EventEmitter();

  constructor(
    private bookingService: BookingService,
    private toastService: ToastService
  ) {}

  travelStatusOptions = ['Not Started', 'In Progress', 'Completed'];

  ngOnInit(): void {
    this.fetchbookingdata();
  }

  fetchbookingdata() {
    this.bookingService.getSingleBookedPackage(this.id).subscribe((res) => {
      if (res.success) {
        this.booking = res.bookedPackage;
        return;
      }
      this.toastService.showToast('Somthing went wrong', 'error');
    });
  }

  confirmBooking() {
    if (!this.booking) {
      this.toastService.showToast('Somthing Went wrong', 'error');
      return;
    }
    this.bookingService
      .confirmBooking(this.booking?._id, this.booking?.confirmation)
      .subscribe((res) => {
        if (res.success) {
          this.toastService.showToast(res.message, 'success');
          this.fetchbookingdata();
        }
      });
  }

  cancelBooking() {
    if (this.booking?.confirmation) this.booking.confirmation = false;
    console.log('Booking cancelled:', this.booking);
  }

  closePage() {
    this.closePageEvent.emit();
  }
}
