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

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
  ],
  selector: 'app-deluxe-travel-booking',
  templateUrl: './booking.component.html',
  styles: [
    `
      /* You can add any additional styles here */
    `,
  ],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  couponMessage: string = '';
  couponValid: boolean = false;
  destinations: any[] = [
    { name: 'Himalaya, Asia' },
    { name: 'Machu Picchu, Peru' },
    { name: 'Santorini, Greece' },
    { name: 'Bali, Indonesia' },
    { name: 'Queenstown, New Zealand' },
  ];

  constructor(private fb: FormBuilder) {}

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

    // Add two travelers by default (for adults)
    this.addTraveler();
    this.addTraveler();
  }

  get travelers() {
    return this.bookingForm.get('travelers') as FormArray;
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
