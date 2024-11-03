import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy } from '@angular/core';
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
import { HeaderComponent } from '../header/header.component';
import { IPackage } from '../../../interfaces/package.interface';
import { Store } from '@ngrx/store';
import {
  selectCoupons,
  selectPackage,
  selectPrice,
} from '../../../store/user/user.selector';
import { ToastService } from '../../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import {
  applyCoupon,
  getAllCoupon,
  showSinglePackage,
} from '../../../store/user/user.action';
import { BookingService } from '../../../shared/services/booking.service';
import { ICoupon } from '../../../interfaces/coupon.interface';
import { CouponService } from '../../../shared/services/coupon.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { dateValidator } from '../../../validatores/date.validator';
import {
  endWithSpace,
  invalidChar,
  letterOrNumber,
} from '../../../validatores/name.validator';
import { invalidPhone } from '../../../validatores/phone.validator';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    CommonModule,
    ReactiveFormsModule,
    TruncatePipe,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
  ],
  selector: 'app-deluxe-travel-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnDestroy {
  showPolicy = false
  bookingForm!: FormGroup;
  packageDetails: IPackage = {} as IPackage;
  couponMessage: string = '';
  couponValid: boolean = false;
  coupons$: Observable<ICoupon[] | null> = this._store.select(selectCoupons);
  showAllCoupons = false;
  price$: Observable<number> = this._store.select(selectPrice);
  discoundedPrice: number = 0;
  discount: number = 0;
  selectedCouponId: string = '';
  invalidForm: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _toastService: ToastService,
    private _router: Router,
    private _bookingService: BookingService,
    private _localStorage: LocalStorageService,
    private _userService: UserService
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
      this._store.dispatch(applyCoupon({ id, packagePrice: Number(price) }));

      this.price$.pipe(takeUntil(this.destroy$)).subscribe((result) => {
        this.discoundedPrice = result;
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

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.invalidForm = true;
      return;
    }

    this._bookingService
      .createPayment(this.packageDetails._id, this.selectedCouponId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        const options = {
          key_id: 'rzp_test_ihsNz6lracNIu3',
          amount: res.amount,
          currency: res.currency,
          name: 'Travel',
          description: 'Test Transaction',
          order_id: res.id,
          handler: (response: any) => this.handlePayment(response),
          prefill: {
            name: 'testUser',
            email: 'test@gmail.com',
            contact: '1234567890',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const razorpay = new Razorpay(options);
        razorpay.open();
      });
  }

  private handlePayment(response: any) {
    this._bookingService
      .verifyPayment(
        response.razorpay_order_id,
        response.razorpay_payment_id,
        response.razorpay_signature,
        this.packageDetails._id,
        this.packageDetails.agencyId._id,
        this.selectedCouponId,
        this.bookingForm.value
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this._toastService.showToast(res.message, 'success');
          this._router.navigate(['/packages']);
        }
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
