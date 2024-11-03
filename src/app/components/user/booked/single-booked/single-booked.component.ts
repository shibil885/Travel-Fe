import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { IBooking } from '../../../../interfaces/booking.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ToastService } from '../../../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { BookingService } from '../../../../shared/services/booking.service';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SideBarComponent],
  templateUrl: './single-booked.component.html',
  styleUrls: ['./single-booked.component.css'],
})
export class SingleBookedComponent {
  bookingDetails!: IBooking;
  @Output() closePageEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private _bookingService: BookingService,
    private _storageService: LocalStorageService,
    private _toasteService: ToastService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const bookingId = this._storageService.getItem('_bookingId');
    if (!bookingId) {
      this._toasteService.showToast('Cant find bookingId', 'error');
      this._router.navigate(['/booked']);
      return;
    }
    this._bookingService.getSingleBookedPackage(bookingId).subscribe((res) => {
      if (res.success) {
        this.bookingDetails = res.bookedPackage;
        return;
      }
    });
  }

  onCancel(): void {
    console.log('Booking cancelled');
  }
}
