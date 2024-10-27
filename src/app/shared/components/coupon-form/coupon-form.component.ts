import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { ToastService } from '../../services/toaster.service';
import { ICoupon } from '../../../interfaces/coupon.interface';
import { descriptionValidator } from '../../../validatores/description.validator';
import { CommonModule } from '@angular/common';
import { invalidCoupon } from '../../../validatores/couponCode.validator';
import { dateValidator } from '../../../validatores/date.validator';
import { priceValidator } from '../../../validatores/price.validator';

@Component({
  selector: 'app-coupon-form',
  standalone: true,
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class CouponFormComponent implements OnInit {
  @Input() selectedCoupon!: ICoupon | null;
  @Output() closeFormAfterAdditionOrEdit = new EventEmitter();
  couponForm!: FormGroup;
  isEditMode = false;
  isNotValidForm!: boolean;
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(4), invalidCoupon]],
      discount_type: ['', Validators.required],
      description: ['', [Validators.required, descriptionValidator]],
      expiry_date: [null, [Validators.required, dateValidator]],
      minAmt: [null, [Validators.required, priceValidator]],
      maxAmt: [null],
      percentage: [null],
      discount_value: [null],
    });

    this.couponForm
      .get('discount_type')
      ?.valueChanges.subscribe((discountType: string) => {
        const maxAmtControl = this.couponForm.get('maxAmt');
        const percentageControl = this.couponForm.get('percentage');
        const discountValueControl = this.couponForm.get('discount_value');

        if (discountType === 'fixed') {
          discountValueControl?.setValidators([
            Validators.required,
            priceValidator,
          ]);
          maxAmtControl?.clearValidators();
          percentageControl?.clearValidators();
        } else if (discountType === 'percentage') {
          maxAmtControl?.setValidators([Validators.required, priceValidator]);
          percentageControl?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(100),
          ]);
          discountValueControl?.clearValidators();
        }
        maxAmtControl?.updateValueAndValidity();
        percentageControl?.updateValueAndValidity();
        discountValueControl?.updateValueAndValidity();
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
        ? new Date(coupon.expiry_date).toISOString().split('T')[0]
        : null,
    });
    console.log(
      coupon.expiry_date
        ? new Date(coupon.expiry_date).toISOString().split('T')[0]
        : null
    );
  }

  onSubmit(): void {
    if (this.couponForm.invalid) {
      console.log(this.couponForm);
      this.isNotValidForm = true;
      return;
    }
    if (this.isEditMode) {
      this.couponService
        .editCoupon(this.selectedCoupon!._id, this.couponForm.value)
        .subscribe((res) => {
          if (res.success) {
            this.toastService.showToast(res.message, 'success');
          }
        });
    } else {
      this.couponService
        .createCoupon(this.couponForm.value)
        .subscribe((res) => {
          if (res.success) {
            this.toastService.showToast(res.message, 'success');
          }
        });
    }
    this.closeFormAfterAdditionOrEdit.emit();
  }
}
