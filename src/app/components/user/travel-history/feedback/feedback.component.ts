import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from '../star/star.component';
import { BookingService } from '../../../../shared/services/booking.service';
import { IBooking } from '../../../../interfaces/booking.interface';

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
  feedback = {
    rating: 0,
    review: '',
  };
  constructor(private _bookingService: BookingService) {}

  ngOnInit(): void {
    if (this.booking) {
      this._bookingService
        .isFeedBackExist(this.booking.package_id)
        .subscribe((res) => {
          this.feedback.rating = res.rating;
          this.feedback.review = res.review;
        });
    }
  }

  onRatingChange(rating: number) {
    this.feedback.rating = rating;
  }

  close() {
    this.closeModal.emit();
  }

  submitFeedback() {
    if (this.feedback.rating > 0 && this.feedback.review.trim()) {
      this.submitFeedbackEvent.emit(this.feedback);
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
