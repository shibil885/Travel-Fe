// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { StarComponent } from '../star/star.component';
// import { BookingService } from '../../../../shared/services/booking.service';
// import { IBooking } from '../../../../interfaces/booking.interface';

// @Component({
//   selector: 'app-feedback',
//   standalone: true,
//   imports: [CommonModule, FormsModule, StarComponent],
//   templateUrl: './feedback.component.html',
//   styleUrls: ['./feedback.component.css'],
// })
// export class FeedbackComponent {
//   @Input() booking: IBooking | null = null;
//   @Output() closeModal = new EventEmitter<void>();
//   @Output() submitFeedbackEvent = new EventEmitter<any>();
//   feedback = {
//     rating: 0,
//     review: '',
//   };
//   constructor(private _bookingService: BookingService) {}

//   ngOnInit(): void {
//     if (this.booking) {
//       this._bookingService
//         .isFeedBackExist(this.booking.package_id)
//         .subscribe((res) => {
//           this.feedback.rating = res.rating;
//           this.feedback.review = res.review;
//         });
//     }
//   }

//   onRatingChange(rating: number) {
//     this.feedback.rating = rating;
//   }

//   close() {
//     this.closeModal.emit();
//   }

//   submitFeedback() {
//     if (this.feedback.rating > 0 && this.feedback.review.trim()) {
//       this.submitFeedbackEvent.emit(this.feedback);
//       this.close();
//     }
//   }

//   getRatingText(rating: number): string {
//     switch (rating) {
//       case 1:
//         return 'Poor';
//       case 2:
//         return 'Fair';
//       case 3:
//         return 'Good';
//       case 4:
//         return 'Very Good';
//       case 5:
//         return 'Excellent';
//       default:
//         return 'Select a rating';
//     }
//   }
// }
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from '../star/star.component';
import { BookingService } from '../../../../shared/services/booking.service';
import { IBooking } from '../../../../interfaces/booking.interface';
import { forkJoin } from 'rxjs';
import { ToastService } from '../../../../shared/services/toaster.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule, StarComponent],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  @Input() booking: IBooking | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitFeedbackEvent = new EventEmitter<any>();

  // Separate feedback for package and agency
  packageFeedback = {
    rating: 0,
    review: '',
  };
  agencyFeedback = {
    rating: 0,
    review: '',
  };

  constructor(
    private _bookingService: BookingService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.booking) {
      const agencyFeedBack$ = this._bookingService.isUserHaveFeedBackOnAgency(
        this.booking.agency._id
      );
      const packageFeedBack$ = this._bookingService.isUserHaveFeedBackOnPackge(
        this.booking.package_id
      );

      forkJoin([agencyFeedBack$, packageFeedBack$]).subscribe(([a, p]) => {
        if (a.success && p.success) {
          this.agencyFeedback.rating = a.rating;
          this.agencyFeedback.review = a.review;
          this.packageFeedback.rating = p.rating;
          this.packageFeedback.review = p.review;
        } else {
          this._toastService.showToast(
            'Somthing went wrong, please refresh',
            'error'
          );
        }
      });
    }
  }

  onPackageRatingChange(rating: number) {
    this.packageFeedback.rating = rating;
  }

  onAgencyRatingChange(rating: number) {
    this.agencyFeedback.rating = rating;
  }

  close() {
    this.closeModal.emit();
  }

  submitFeedback() {
    if (
      this.packageFeedback.rating > 0 &&
      this.packageFeedback.review.trim() &&
      this.agencyFeedback.rating > 0 &&
      this.agencyFeedback.review.trim()
    ) {
      const feedback = {
        packageFeedback: this.packageFeedback,
        agencyFeedback: this.agencyFeedback,
      };
      this.submitFeedbackEvent.emit(feedback);
      this.close();
    }
  }

  getRatingText(rating: number): string {
    switch (rating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return 'Select a rating';
    }
  }
}
