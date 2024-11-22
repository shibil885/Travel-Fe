import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { IPackage } from '../../../interfaces/package.interface';
import { Store } from '@ngrx/store';
import {
  selectAmount,
  selectCoupons,
  selectCurrency,
  selectError,
  selectMessage,
  selectOrderId,
  selectPackage,
  selectPrice,
  selectSuccess,
} from '../../../store/user/user.selector';
import { ToastService } from '../../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import {
  applyCoupon,
  getAllCoupon,
  initiatePayment,
  showSinglePackage,
  verifyPayment,
} from '../../../store/user/user.action';
import { DiscountType, ICoupon } from '../../../interfaces/coupon.interface';
import { Observable, take } from 'rxjs';
import { dateValidator } from '../../../validatores/date.validator';
import {
  endWithSpace,
  invalidChar,
  letterOrNumber,
} from '../../../validatores/name.validator';
import { invalidPhone } from '../../../validatores/phone.validator';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { UserService } from '../../../shared/services/user.service';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { DiscountPipe } from '../../../shared/pipes/discount.pipe';

@Component({
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    CommonModule,
    ReactiveFormsModule,
    TruncatePipe,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    DiscountPipe,
  ],
  selector: 'app-deluxe-travel-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  showPolicy = false;
  bookingForm!: FormGroup;
  packageDetails: IPackage = {} as IPackage;
  couponMessage: string = '';
  couponValid: boolean = false;
  showAllCoupons = false;
  price$: Observable<number> = this._store.select(selectPrice);
  coupons$: Observable<ICoupon[] | null> = this._store.select(selectCoupons);
  amount$: Observable<number> = this._store.select(selectAmount);
  currency$: Observable<string> = this._store.select(selectCurrency);
  orderId$: Observable<string> = this._store.select(selectOrderId);
  success$: Observable<boolean> = this._store.select(selectSuccess);
  message$: Observable<string> = this._store.select(selectMessage);
  error$: Observable<string> = this._store.select(selectError);
  amount!: number;
  currency!: string;
  orderId!: string;
  discoundedPrice: number = 0;
  discount: number = 0;
  selectedCouponId: string = '';
  invalidForm: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _toastService: ToastService,
    private _router: Router,
    private _localStorage: LocalStorageService,
    private _userService: UserService,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    this.initializePackageDetails();
    this.initializeForm();
    this.fetchCoupons();
  }

  private initializePackageDetails() {
    this._store
      .select(selectPackage)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          window.scrollTo(0, 0);
          this.packageDetails = res;
        } else {
          const packageId = this._localStorage.getItem('_packageId');
          if (packageId) {
            this._userService
              .getSinglePackage(packageId)
              .pipe(take(1))
              .subscribe((response) => {
                console.log('package for booking', response.package);
                this.packageDetails = response.package;
              });
          } else {
            this._toastService.showToast('Package ID not found', 'error');
            this._router.navigate(['packages']);
          }
        }
      });
  }

  private initializeForm() {
    this.bookingForm = this._fb.group({
      travelDates: ['', [Validators.required, dateValidator]],
      person: [
        1,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          endWithSpace,
          letterOrNumber,
          invalidChar,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          endWithSpace,
          letterOrNumber,
          invalidChar,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, invalidPhone]],
      travelers: new FormArray([]),
    });

    this.bookingForm.get('person')?.valueChanges.subscribe((value) => {
      if (Number(value) <= Number(this.packageDetails.people)) {
        this.updateTraveller(value);
      }
    });

    this.updateTraveller(1);
  }

  private fetchCoupons() {
    const id =
      this.packageDetails?._id ||
      this._localStorage.getItem('_packageId') ||
      '';
    if (id) {
      this._store.dispatch(getAllCoupon({ packageId: id }));
    }
  }

  get travelers() {
    return this.bookingForm.get('travelers') as FormArray;
  }

  updateTraveller(personCount: number) {
    const travelersArray = new FormArray(
      Array.from({ length: personCount }, () =>
        this._fb.group({
          name: [
            '',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(20),
            ],
          ],
          age: [
            '',
            [Validators.required, Validators.min(1), Validators.max(120)],
          ],
        })
      )
    );
    this.bookingForm.setControl('travelers', travelersArray);
  }

  viewDetails() {
    if (this.packageDetails._id) {
      this._store.dispatch(showSinglePackage({ id: this.packageDetails._id }));
    } else {
      this._toastService.showToast('Something went wrong', 'error');
      this._router.navigate(['packages']);
    }
  }

  applyCoupon(id: string | undefined, price: string | undefined) {
    if (id && price) {
      if (this.packageDetails.offerId) {
        this._store.dispatch(
          applyCoupon({
            id,
            packagePrice: Number(price),
            offer: this.packageDetails.offerId,
          })
        );
      } else {
        this._store.dispatch(
          applyCoupon({
            id,
            packagePrice: Number(price),
            offer: undefined,
          })
        );
      }

      //////////////////////////////

      this.price$.subscribe((result) => {
        // if (this.packageDetails.offerId) {
        //   if (
        //     this.packageDetails.offerId.discount_type === DiscountType.FIXED
        //   ) {
        //     const newAmt =
        //       result - Number(this.packageDetails.offerId.discount_value) + 50;
        //     if (newAmt <= 0) {
        //       this.discoundedPrice = 50;
        //     } else {
        //       this.discoundedPrice = newAmt;
        //     }
        //   } else if (
        //     this.packageDetails.offerId.discount_type ===
        //     DiscountType.PERCENTAGE
        //   ) {
        //     this.discoundedPrice;
        //     const newAmt =
        //       result -
        //       Number(this.packageDetails.price) *
        //         (Number(this.packageDetails.offerId.percentage) / 100) +
        //       50;
        //     if (newAmt <= 0) {
        //       this.discoundedPrice = 50;
        //     } else {
        //       this.discoundedPrice = newAmt;
        //     }
        //   }
        // // }
        // console.log('result', result);
        // console.log('discounted price', this.discoundedPrice);
        this.discoundedPrice = result
        this.discount = Number(this.packageDetails.price) - result;
        this.selectedCouponId = id;
      });
    } else {
      this._toastService.showToast('Cannot find Coupon', 'error');
    }
  }

  cancelCoupon() {
    this.fetchCoupons();
    this.discoundedPrice = 0;
    this.discount = 0;
    this.selectedCouponId = '';
  }

  async onSubmit() {
    console.log('form submitted');
    if (this.bookingForm.invalid) {
      this.invalidForm = true;
      return;
    }

    this._store.dispatch(
      initiatePayment({
        packageId: this.packageDetails._id,
        couponId: this.selectedCouponId,
      })
    );

    this.success$.subscribe((success) => {
      if (success) {
        this.amount$.subscribe((amount) => (this.amount = amount));
        this.currency$.subscribe((currency) => (this.currency = currency));
        this.orderId$.subscribe((orderId) => (this.orderId = orderId));
        const options = {
          key_id: 'rzp_test_ihsNz6lracNIu3',
          amount: this.amount,
          currency: this.currency,
          name: 'Travel',
          description: 'Test Transaction',
          order_id: this.orderId,
          handler: (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => this.handlePayment(response),
          prefill: {
            name: 'testUser',
            email: 'test@gmail.com',
            contact: '1234567890',
          },
          theme: {
            color: '#6196cc',
          },
        };
        const razorpay = new Razorpay(options);
        razorpay.open();
      }
      return;
    });
  }

  private handlePayment(response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    this._ngZone.run(() => {
      this._store.dispatch(
        verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          agencyId: this.packageDetails.agencyId._id,
          packageId: this.packageDetails._id,
          couponId: this.selectedCouponId,
          bookingData: this.bookingForm.value,
        })
      );

      this.message$.pipe(take(1)).subscribe((message) => {
        this._toastService.showToast('Successfully booked', 'success');
      });
    });
  }
}
