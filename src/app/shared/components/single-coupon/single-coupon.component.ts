import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ICoupon } from '../../../interfaces/coupon.interface';
import { DaysLeftPipe } from '../../pipes/days-left.pipe';
import { CouponService } from '../../services/coupon.service';
import { ToastService } from '../../services/toaster.service';

@Component({
  selector: 'app-single-coupon',
  standalone: true,
  imports: [CommonModule, DaysLeftPipe],
  templateUrl: './single-coupon.component.html',
  styleUrl: './single-coupon.component.css',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class SingleCouponComponent {
  @Input() isModalOpen: boolean = false;
  @Input() selectedCoupon!: ICoupon;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(
    private couponService: CouponService,
    private toastService: ToastService
  ) {}

  closeModal() {
    this.closeModalEvent.emit();
  }

  getDiscountLabel(): string {
    return this.selectedCoupon.discount_type === 'percentage'
      ? 'off'
      : 'discount';
  }

  getDiscountValue(): string {
    if (this.selectedCoupon.discount_type === 'percentage') {
      return `${this.selectedCoupon.percentage}₹`;
    } else {
      return `₹${this.selectedCoupon.discount_value.toFixed(2)}`;
    }
  }
  onChangeStatus(id: string | undefined, status: boolean | undefined) {
    this.couponService.changeStatus(id, status).subscribe((res) => {
      if (res.success) {
        this.toastService.showToast(res.message, 'success');
        this.selectedCoupon.isActive = !status;
        console.log(this.selectedCoupon.isActive);
        return;
      }
    });
  }
}
