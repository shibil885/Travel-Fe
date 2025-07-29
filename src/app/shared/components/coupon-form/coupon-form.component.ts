import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { ToastService } from '../../services/toaster.service';
import { DiscountType, ICoupon } from '../../../interfaces/coupon/coupon.interface';
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
    private _fb: FormBuilder,
    private _couponService: CouponService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.couponForm = this._fb.group({
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

        if (discountType === DiscountType.FIXED) {
          discountValueControl?.setValidators([
            Validators.required,
            priceValidator,
          ]);
          maxAmtControl?.clearValidators();
          percentageControl?.clearValidators();
        } else if (discountType === DiscountType.PERCENTAGE) {
          maxAmtControl?.setValidators([Validators.required, priceValidator]);
          percentageControl?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(99),
          ]);
          discountValueControl?.clearValidators();
        }
        maxAmtControl?.updateValueAndValidity();
        percentageControl?.updateValueAndValidity();
        discountValueControl?.updateValueAndValidity();
      });

    if (this.selectedCoupon) {
      this.isEditMode = true;
      this._populateForm(this.selectedCoupon);
    }
  }

  private _populateForm(coupon: ICoupon): void {
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
  }

  onSubmit(): void {
    if (this.couponForm.invalid) {
      console.log(this.couponForm);
      this.isNotValidForm = true;
      return;
    }
    if (this.isEditMode) {
      this._couponService
        .editCoupon(this.selectedCoupon!._id, this.couponForm.value)
        .subscribe((res) => {
          if (res.success) {
            this._toastService.showToast(res.message, 'success');
          }
        });
      this.closeFormAfterAdditionOrEdit.emit();
      return;
    } else {
      this._couponService
        .createCoupon(this.couponForm.value)
        .subscribe((res) => {
          if (res.success) {
            this._toastService.showToast(res.message, 'success');
          }
        });
      this.closeFormAfterAdditionOrEdit.emit();
      return;
    }
  }
}
