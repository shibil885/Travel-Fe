import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    SearchComponent,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css',
})
export class CouponComponent {
  private coupons!:any;
  totalCoupons!: number;
  limit!: number;
  currentPage!: number;
  headers = [
    {label: 'Name', key: 'name'},
    {label: 'Min', key: 'min'},
    {label: 'Max', key: 'max'},
  ]
  onPageChange(page: number) {}
}
