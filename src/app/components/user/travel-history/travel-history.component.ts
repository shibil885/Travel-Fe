import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../shared/services/booking.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { ToastService } from '../../../shared/services/toaster.service';
import { forkJoin } from 'rxjs';
import { IBooking } from '../../../interfaces';

@Component({
  selector: 'app-travel-history',
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    PaginationComponent,
    SearchComponent,
    CommonModule,
    FeedbackComponent,
  ],
  templateUrl: './travel-history.component.html',
  styleUrl: './travel-history.component.css',
})
export class TravelHistoryComponent {
  travelHistory: IBooking[] = [];
  limit: number = 5;
  currentPage: number = 1;
  totalPackages: number = 0;
  showFeedbackModal: boolean = false;
  selectedBooking: IBooking | null = null;

  constructor(
    private _bookingService: BookingService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this._fetchBookings();
  }

  private _fetchBookings() {
    this._bookingService
      .getTravelHistoryOfUser(this.currentPage, this.limit)
      .subscribe((res) => {
        this.travelHistory = res.history;
        this.totalPackages = res.totalItems;
        this.currentPage = res.currentPage;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this._fetchBookings();
  }

  onSearch(searchTerm: Event) {
    console.log('Searching for:', searchTerm);
  }

  openFeedbackModal(booking: IBooking) {
    this.selectedBooking = booking;
    this.showFeedbackModal = true;
  }

  closeFeedbackModal() {
    this.showFeedbackModal = false;
    this.selectedBooking = null;
  }

  submitFeedback(feedback: {
    packageFeedback: {
      rating: number;
      review: string;
    };
    agencyFeedback: {
      rating: number;
      review: string;
    };
  }) {
    if (
      this.selectedBooking &&
      this.selectedBooking.package_id &&
      this.selectedBooking.package_id
    ) {
      const agencyFeedBack$ = this._bookingService.createFeedbackForAgency(
        this.selectedBooking.agency._id,
        {
          rating: feedback.agencyFeedback.rating,
          review: feedback.agencyFeedback.review,
        }
      );

      const packageFeedBack$ = this._bookingService.createFeedbackForPackage(
        this.selectedBooking.package_id,
        {
          rating: feedback.packageFeedback.rating,
          review: feedback.packageFeedback.review,
        }
      );
      forkJoin([agencyFeedBack$, packageFeedBack$]).subscribe(
        ([agencyFeedback, packageFeedback]) => {
          if (agencyFeedback.success && packageFeedback.success) {
            this._toastService.showToast(agencyFeedback.message, 'success');
            this._fetchBookings();
          } else {
            this._toastService.showToast('Somthing went wrong', 'error');
          }
        }
      );
    }
  }
}
