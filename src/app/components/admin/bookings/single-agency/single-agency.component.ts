import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toaster.service';
import { BookingService } from '../../../../shared/services/booking.service';
import { IBooking } from '../../../../interfaces';

@Component({
  selector: 'app-single-agency',
  standalone: true,
  imports: [SideBarComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './single-agency.component.html',
  styleUrl: './single-agency.component.css',
})
export class SingleAgencyComponent {
  private _agencyId: string | null = null;
  limit: number = 5;
  totalCompletedBookings!: number;
  totalStartedBookings!: number;
  totalPendingBookings!: number;
  totalCancelledBookings!: number;

  currentPageOfCompleted: number = 1;
  currentPageOfPending: number = 1;
  currentPageOfStarted: number = 1;
  currentPageOfCancelled: number = 1;

  completed: IBooking[] = [];
  pending: IBooking[] = [];
  started: IBooking[] = [];
  cancelled: IBooking[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _bookingService: BookingService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this._agencyId = this._route.snapshot.paramMap.get('id');
    console.log(this._agencyId);
    if (!this._agencyId) {
      this._router.navigate(['admin/bookings']);
      this._toastService.showToast('Id not provided', 'error');
      return;
    }
    this._fetchCompletedBookings();
    this._fetchCancelledBookings();
    this._fetchPendingBookings();
    this._fetchStartedBookings();
  }

  private _fetchCompletedBookings() {
    if (!this._agencyId || !this._route.snapshot.paramMap.get('id')) {
      this._router.navigate(['admin/bookings']);
      this._toastService.showToast('Id not provided', 'error');
      return;
    }
    this._bookingService
      .getCompletedBookings(
        this._agencyId,
        this.currentPageOfCompleted,
        this.limit
      )
      .subscribe((res) => {
        if (res.success) {
          (this.completed = res.bookings),
            (this.currentPageOfCompleted = res.page);
          this.totalCompletedBookings = res.totalItems;
        }
      });
  }

  private _fetchPendingBookings() {
    if (!this._agencyId || !this._route.snapshot.paramMap.get('id')) {
      this._router.navigate(['admin/bookings']);
      this._toastService.showToast('Id not provided', 'error');
      return;
    }
    this._bookingService
      .getPendingBookings(
        this._agencyId,
        this.currentPageOfCompleted,
        this.limit
      )
      .subscribe((res) => {
        if (res.success) {
          (this.pending = res.bookings),
            (this.currentPageOfCompleted = res.page);
          this.totalCompletedBookings = res.totalItems;
        }
      });
  }

  private _fetchStartedBookings() {
    if (!this._agencyId || !this._route.snapshot.paramMap.get('id')) {
      this._router.navigate(['admin/bookings']);
      this._toastService.showToast('Id not provided', 'error');
      return;
    }
    this._bookingService
      .getStartedBookings(
        this._agencyId,
        this.currentPageOfCompleted,
        this.limit
      )
      .subscribe((res) => {
        if (res.success) {
          console.log(res);
          (this.started = res.bookings),
            (this.currentPageOfCompleted = res.page);
          this.totalCompletedBookings = res.totalItems;
        }
      });
  }

  private _fetchCancelledBookings() {
    if (!this._agencyId || !this._route.snapshot.paramMap.get('id')) {
      this._router.navigate(['admin/bookings']);
      this._toastService.showToast('Id not provided', 'error');
      return;
    }
    this._bookingService
      .getCancelledBookings(
        this._agencyId,
        this.currentPageOfCompleted,
        this.limit
      )
      .subscribe((res) => {
        if (res.success) {
          (this.cancelled = res.bookings),
            (this.currentPageOfCompleted = res.page);
          this.totalCompletedBookings = res.totalItems;
        }
      });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-500',
      started: 'bg-blue-500',
      completed: 'bg-green-500',
      cancelled: 'bg-red-500',
    };
    return colors[status.toLowerCase()] || '';
  }
}
