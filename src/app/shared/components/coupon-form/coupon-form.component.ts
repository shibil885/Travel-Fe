import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { ToastService } from '../../services/toaster.service';
import { ICoupon } from '../../../interfaces/coupon.interface';
import { descriptionValidator } from '../../../validatores/description.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupon-form',
  standalone: true,
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CouponFormComponent implements OnInit {
  @Input() selectedCoupon!: ICoupon | null;
  couponForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(10), descriptionValidator]],
      discount_type: ['', Validators.required],
      discount_value: [null, Validators.required],
      percentage: ['', Validators.required],
      minAmt: [null, Validators.required],
      maxAmt: [null],
      expiry_date: [null, Validators.required],
    });

    if (this.selectedCoupon) {
      this.isEditMode = true;
      this.populateForm(this.selectedCoupon);
    }
  }

  private populateForm(coupon: ICoupon): void {
    this.couponForm.patchValue({
      code: coupon.code,
      description: coupon.description,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      percentage: coupon.percentage,
      minAmt: coupon.minAmt,
      maxAmt: coupon.maxAmt,
      expiry_date: coupon.expiry_date
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.couponService.editCoupon(this.selectedCoupon!._id, this.couponForm.value).subscribe((res) => {
        if (res.success) {
          this.toastService.showToast(res.message, 'success');
        }
      });
    } else {
      this.couponService.createCoupon(this.couponForm.value).subscribe((res) => {
        if (res.success) {
          this.toastService.showToast(res.message, 'success');
        }
      });
    }
  }
}
