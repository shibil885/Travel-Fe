import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ICoupon } from '../../../interfaces/coupon.interface';
import { trigger, transition, style, animate } from '@angular/animations';

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
import { SingleCouponComponent } from '../../../shared/components/single-coupon/single-coupon.component';
import { CouponFormComponent } from '../../../shared/components/coupon-form/coupon-form.component';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    SearchComponent,
    PaginationComponent,
    CouponFormComponent,
    SingleCouponComponent,
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
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
    trigger('zoomInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate('300ms', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'scale(0.9)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class CouponComponent {
  renderCouponList: boolean = true;
  renderCouponAddForm: boolean = false;
  renderCouponEditForm: boolean = false;
  coupons!: any[];
  totalCoupons!: number;
  limit!: number;
  currentPage!: number;
  couponForm!: FormGroup;
  isEditMode: boolean = false;
  isModalOpen = false;
  selectedCoupon: ICoupon | null = null;
  selectedCouponForShow!: ICoupon;
  headers = [
    { label: 'Coupon Code', key: 'code' },
    { label: 'Description', key: 'description' },
    { label: 'Percentage', key: 'percentage' },
    { label: 'Minimum', key: 'minAmt' },
    { label: 'Max-discount', key: 'maxAmt' },
    { label: 'Expiration', key: 'expiry_date' },
    { label: 'Status', key: 'isActive' },
    { label: 'Discount', key: 'discount_value' },
  ];
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private toastSrvice: ToastService
  ) {}

  ngOnInit(): void {
    // this.couponForm = this.fb.group({
    //   code: ['', [Validators.required, Validators.minLength(4)]],
    //   description: [
    //     '',
    //     [Validators.required, Validators.minLength(10), descriptionValidator],
    //   ],
    //   discount_type: ['', Validators.required],
    //   discount_value: [null, Validators.required],
    //   percentage: ['', Validators.required],
    //   minAmt: [null, Validators.required],
    //   maxAmt: [null],
    //   expiry_date: [null, Validators.required],
    // });

    this.couponService.getAllCoupons().subscribe((res) => {
      this.coupons = res.coupons;
    });
  }
  onPageChange(page: number) {}

  onRenderCouponList() {
    this.renderCouponList = !this.renderCouponList;
    this.renderCouponAddForm = false;
    this.renderCouponEditForm = false;
  }
  onRenderCouponAddForm() {
    this.selectedCoupon = null;
    this.renderCouponAddForm = !this.renderCouponAddForm;
    this.renderCouponList = !this.renderCouponList;
    this.renderCouponEditForm = false;
  }

  onRenderCouponEditForm(coupon: ICoupon) {
    this.selectedCoupon = coupon;
    this.renderCouponAddForm = true;
    this.renderCouponList = false;
    this.renderCouponEditForm = false;
  }

  openModal(coupon: ICoupon) {
    this.selectedCouponForShow = coupon;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
