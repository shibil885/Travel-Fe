import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
// import Razorpay from 'razorpay';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
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
export class BookingComponent {
  bookingForm!: FormGroup;
  packageDetails!: IPackage;
  couponMessage: string = '';
  couponValid: boolean = false;
  coupons: ICoupon[] = [];
  showAllCoupons = false;
  price$: Observable<number> = this.store.select(selectPrice);
  discoundedPrice!: number;
  discount!: number
  selectedCouponId: string = '';
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastService: ToastService,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.store.select(selectPackage).subscribe((res) => {
      if (res) {
        window.scrollTo(0, 0);
        this.packageDetails = res;
        return;
      }
      this.toastService.showToast('Something went wrong', 'error');
      return this.router.navigate(['packages']);
    });

    this.fetchCoupon();

    this.bookingForm = this.fb.group({
      travelDates: ['', Validators.required],
      person: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(Number(this.packageDetails.people)),
          Validators.pattern(/^\d+$/),
        ],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      travelers: new FormArray([]),
    });
    this.bookingForm.get('person')?.valueChanges.subscribe((value) => {
      if (Number(value) <= Number(this.packageDetails.people)) {
        this.updateTraveller(value);
        return;
      }
    });
    this.updateTraveller(1);
  }

  get travelers() {
    return this.bookingForm.get('travelers') as FormArray;
  }

  get persons() {
    return this.bookingForm.get('person') as FormGroup;
  }

  fetchCoupon() {
    if (this.packageDetails._id) {
      this.store.dispatch(getAllCoupon({ packageId: this.packageDetails._id }));
      this.store.select(selectCoupons).subscribe((res) => {
        return res ? (this.coupons = res) : false;
      });
    }
  }

  updateTraveller(person = this.persons.value) {
    const currentPeoples = this.travelers.length;
    if (person > currentPeoples) {
      for (let i = currentPeoples; i < person; i++) {
        const travelerForm = this.fb.group({
          name: ['', Validators.required],
          age: ['', [Validators.required, Validators.min(0)]],
          passportNumber: ['', Validators.required],
        });
        this.travelers.push(travelerForm);
      }
    } else if (person < currentPeoples) {
      for (let i = currentPeoples - 1; i >= person; i--) {
        this.travelers.removeAt(i);
      }
    }
  }

  //   addTraveler() {
  //     const newValue = this.bookingForm.get('person')?.value + 1;
  //     this.bookingForm.patchValue({ persons: newValue });
  //     console.log(this.persons.value)
  // }

  viewDetails() {
    if (this.packageDetails._id) {
      this.store.dispatch(showSinglePackage({ id: this.packageDetails._id }));
      return;
    }
    this.toastService.showToast('Something went wrong', 'error');
    return this.router.navigate(['packages']);
  }

  applyCoupon(id: string | undefined, price: string | undefined) {
    if (id && price) {
      const priceInNumber = Number(price);
      this.store.dispatch(applyCoupon({ id: id, packagePrice: priceInNumber }));
      this.price$.subscribe((result) => {
        this.discoundedPrice = result;
        this.discount = Number(this.packageDetails.price) -result
        this.coupons = []
        this.selectedCouponId = id;
      });
      return;
    }
    this.toastService.showToast('Cant find Coupon', 'error');
    return;
  }
  cancelCoupon() {
    this.fetchCoupon();
    this.discoundedPrice = 0
    this.discount = 0
    this.selectedCouponId = ''
  }

  onSubmit() {
    // if (this.bookingForm.valid) {
    //   console.log('Booking submitted:', this.bookingForm.value);
    // }
    this.bookingService.createPayment(this.packageDetails._id, this.selectedCouponId).subscribe((res: any) => {
      const options = {
        key_id: 'rzp_test_ihsNz6lracNIu3',
        amount: res.amount,
        currency: res.currency,
        name: 'Travel',
        description: 'Test Transaction',
        order_id: res.id,
        handler: (response: any) => {
          console.log('Payment Success', response);
          // Handle post-payment success logic here (e.g., updating database)
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
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
}
