import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { invalidCoupon } from '../../../../validatores/couponCode.validator';
import { descriptionValidator } from '../../../../validatores/description.validator';
import { dateValidator } from '../../../../validatores/date.validator';
import { DiscountType } from '../../../../interfaces/coupon/coupon.interface';
import { priceValidator } from '../../../../validatores/price.validator';
import { OfferService } from '../../../../shared/services/offer.service';
import { ToastService } from '../../../../shared/services/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOffer } from '../../../../interfaces';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent {
  offerForm!: FormGroup;
  isNotValidForm: boolean = false;
  isEditMode: boolean = false;
  selectedOffer!: IOffer | null;

  constructor(
    private _fb: FormBuilder,
    private readonly _offerService: OfferService,
    private readonly _toastService: ToastService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    const offerId = this._activatedRoute.snapshot.paramMap.get('id');
    if (offerId) {
      this.isEditMode = true;
      this._offerService.getOneOffer(offerId).subscribe((res) => {
        if (res.success) {
          this.selectedOffer = res.offer;
          this.initializeForm({
            ...this.selectedOffer,
            expiry_date: new Date(res.offer.expiry_date)
              .toISOString()
              .split('T')[0],
          });
          return;
        } else if (res.info) {
          this._toastService.showToast(res.message, 'info');
          this._router.navigate(['agency/offers']);
          return;
        }
      });
    } else {
      this.initializeForm();
    }
  }

  initializeForm(offer: IOffer | null = null): void {
    this.offerForm = this._fb.group({
      title: [offer?.title || '', [Validators.required, invalidCoupon]],
      discount_type: [offer?.discount_type || '', Validators.required],
      description: [
        offer?.description || '',
        [Validators.required, descriptionValidator],
      ],
      expiry_date: [
        offer?.expiry_date || '',
        [Validators.required, dateValidator],
      ],
      percentage: [offer?.percentage || ''],
      discount_value: [offer?.discount_value || ''],
    });

    this.offerForm
      .get('discount_type')
      ?.valueChanges.subscribe((discount_type: DiscountType | null) => {
        const percentageControl = this.offerForm.get('percentage');
        const discountValueControl = this.offerForm.get('discount_value');

        if (discount_type === DiscountType.PERCENTAGE) {
          percentageControl?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(99),
          ]);
          discountValueControl?.clearValidators();
          discountValueControl?.setValue('');
        } else if (discount_type === DiscountType.FIXED) {
          discountValueControl?.setValidators([
            Validators.required,
            Validators.min(0.1),
            priceValidator,
          ]);
          percentageControl?.clearValidators();
          percentageControl?.setValue('');
        } else {
          percentageControl?.clearValidators();
          discountValueControl?.clearValidators();
        }

        percentageControl?.updateValueAndValidity();
        discountValueControl?.updateValueAndValidity();
      });
  }

  onSubmit(): void {
    this.isNotValidForm = this.offerForm.invalid;

    if (this.offerForm.valid) {
      const offerData = this.offerForm.value;

      if (this.isEditMode && this.selectedOffer) {
        this._offerService.editOffer(this.selectedOffer._id, offerData).subscribe((res) => {
          if (res.success) {
            this._toastService.showToast(res.message, 'success');
            this._router.navigate(['agency/offers']);
          }
        });
      } else {
        this._offerService.addOffer(offerData).subscribe((res) => {
          if (res.success) {
            this._toastService.showToast(res.message, 'success');
            this._router.navigate(['agency/offers']);
          }
        });
      }
    }
  }
}
