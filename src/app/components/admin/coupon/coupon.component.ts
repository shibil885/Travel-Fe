import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ICoupon } from '../../../interfaces/coupon.interface';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CouponService } from '../../../shared/services/coupon.service';
import { ToastService } from '../../../shared/services/toaster.service';
import { descriptionValidator } from '../../../validatores/description.validator';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    SearchComponent,
    PaginationComponent,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css',
})
export class CouponComponent {
  renderCouponList: boolean = false;
  renderCouponAddForm: boolean = true;
  renderCouponEditForm: boolean = false;
  private coupons!: ICoupon;
  totalCoupons!: number;
  limit!: number;
  currentPage!: number;
  couponForm!: FormGroup;
  headers = [
    { label: 'Name', key: 'name' },
    { label: 'Min', key: 'min' },
    { label: 'Max', key: 'max' },
  ];
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private toastSrvice: ToastService
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
  }
  onPageChange(page: number) {}

  onRenderCouponList() {
    this.renderCouponList = !this.renderCouponList;
    this.renderCouponAddForm = false;
    this.renderCouponEditForm = false;
  }
  onRenderCouponAddForm() {
    this.renderCouponAddForm = !this.renderCouponAddForm;
    this.renderCouponList = false;
    this.renderCouponEditForm = false;
  }
  onRenderCouponEditForm() {
    this.renderCouponEditForm = !this.renderCouponEditForm;
    this.renderCouponList = false;
    this.renderCouponAddForm = false;
  }

  onSubmit() {
    console.log(this.couponForm);

    // this.couponService.createCoupon(this.couponForm.value).subscribe((res) => {
    //   if (res.success) {
    //     this.toastSrvice.showToast(res.message, 'success');
    //     return;
    //   }
    // });
  }
}
