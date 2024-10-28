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
    private router: Router
  ) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      destination: ['', Validators.required],
      travelDates: ['', Validators.required],
      adults: [2, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.required, Validators.min(0)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneCode: ['+91'],
      phone: ['', Validators.required],
      travelers: this.fb.array([]),
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      couponCode: [''],
    });

    this.store.select(selectPackage).subscribe((res) => {
      if (res) {
        window.scrollTo(0, 0);
        this.packageDetails = res;
        return;
      }
      this.toastService.showToast('Something went wrong', 'error');
      return this.router.navigate(['packages']);
    });
  }

  get travelers() {
    return this.bookingForm.get('travelers') as FormArray;
  }
  viewDetails() {
    if (this.packageDetails._id) {
      this.store.dispatch(showSinglePackage({ id: this.packageDetails._id }));
      return;
    }
    this.toastService.showToast('Something went wrong', 'error');
    return this.router.navigate(['packages']);
  }

  addTraveler() {
    const travelerForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      passportNumber: ['', Validators.required],
    });

    this.travelers.push(travelerForm);
  }

  applyCoupon() {
    const couponCode = this.bookingForm.get('couponCode')?.value;
    // Simulating coupon validation
    if (couponCode === 'ADVENTURE25') {
      this.couponMessage = 'Coupon applied successfully! 25% discount added.';
      this.couponValid = true;
    } else {
      this.couponMessage = 'Invalid coupon code. Please try again.';
      this.couponValid = false;
    }
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log('Booking submitted:', this.bookingForm.value);
      // Here you would typically send the form data to your backend
    } else {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.bookingForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
