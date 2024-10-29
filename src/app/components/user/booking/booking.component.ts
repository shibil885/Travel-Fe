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
import { selectPackage } from '../../../store/user/user.selector';
import { ToastService } from '../../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { showSinglePackage } from '../../../store/user/user.action';
import { BookingService } from '../../../shared/services/booking.service';
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
      this.updateTraveller(value);
    });
    this.updateTraveller();
  }

  get travelers() {
    return this.bookingForm.get('travelers') as FormArray;
  }

  get persons() {
    return this.bookingForm.get('person') as FormGroup;
  }

  updateTraveller(person = this.persons.value) {
    console.log(person);
    if (person <= this.packageDetails.people) {
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

  applyCoupon() {
    // const couponCode = this.bookingForm.get('couponCode')?.value;
    // if (couponCode === 'ADVENTURE25') {
    //   this.couponMessage = 'Coupon applied successfully! 25% discount added.';
    //   this.couponValid = true;
    // } else {
    //   this.couponMessage = 'Invalid coupon code. Please try again.';
    //   this.couponValid = false;
    // }
  }

  onSubmit() {
    // if (this.bookingForm.valid) {
    //   console.log('Booking submitted:', this.bookingForm.value);
    // }
    this.bookingService.createPayment().subscribe((res: any) => {
      const options = {
        key_id: 'rzp_test_ihsNz6lracNIu3', // Replace with your Razorpay Key ID
        amount: res.amount,
        currency: res.currency,
        name: 'Your App Name',
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
