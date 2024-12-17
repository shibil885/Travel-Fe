import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { CommonModule } from '@angular/common';
import { IPackage } from '../../../interfaces/package.interface';
import { PackageService } from '../../../shared/services/package.service';
import { IOffer } from '../../../interfaces/offer.interface';
import { DiscountType } from '../../../interfaces/coupon.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderSidebarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  offerPackages: IPackage[] = [];
  topBookedPackages: IPackage[] = [];
  name: string = 'travel';
  constructor(private readonly _packageService: PackageService) {}

  ngOnInit(): void {
    this._fetchOfferPackages();
    this._fetchTopBookedPackages();
  }

  private _fetchOfferPackages() {
    this._packageService.getOfferPackages().subscribe((res) => {
      if (res.success) {
        console.log('offer packages', res.packages);
        this.offerPackages = res.packages;
      }
    });
  }
  private _fetchTopBookedPackages() {
    this._packageService.getTopBookedPackages().subscribe((res) => {
      if (res.success) {
        console.log('booked packages', res.packages);
        console.log(res);
        this.topBookedPackages = res.packages;
      }
    });
  }
  getOfferPrice(offer: IOffer) {
    if (offer.discount_type === DiscountType.FIXED) {
      return `₹ ${offer.discount_value} OFF`;
    }
    return `${offer.percentage} % OFF`;
  }

  getCurrentPrice(price: string, offer: IOffer) {
    if (offer.discount_type === DiscountType.FIXED) {
      if (offer.discount_value) {
        return `₹${Number(price) - offer.discount_value}`;
      }
      return `₹${price}`;
    }
    if (offer.percentage) {
      const amount = Number(price) * (offer.percentage / 100);
      return `₹ ${Number(price) - amount}`;
    }
    return `₹${Number(price)}`;
  }
}
