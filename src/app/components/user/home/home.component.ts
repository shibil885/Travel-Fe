import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { CommonModule } from '@angular/common';
import { IPackage } from '../../../interfaces/package/package.interface';
import { PackageService } from '../../../shared/services/package.service';
import { DiscountType } from '../../../interfaces/coupon/coupon.interface';
import { FormsModule } from '@angular/forms';
import { IOffer } from '../../../interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderSidebarComponent, CommonModule, FormsModule],
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
        const data = res.data;
        if (!data) {
          this.offerPackages = [];
          return;
        }
        this.offerPackages = data?.packages;
      }
    });
  }
  private _fetchTopBookedPackages() {
    this._packageService.getTopBookedPackages().subscribe((res) => {
      const data = res.data;
      if (res.success && data) {
        this.topBookedPackages = data.packages;
        return;
      }
      this.topBookedPackages = [];
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
  topAgencies = [
    {
      name: 'Wanderlust Adventures',
      description: 'Crafting unforgettable journeys since 1995',
      rating: 4.9,
      logo: '/assets/agency1.jpg',
    },
    {
      name: 'Global Explorers',
      description: 'Your passport to extraordinary experiences',
      rating: 4.8,
      logo: '/assets/agency2.jpg',
    },
    {
      name: 'Luxury Voyages',
      description: 'Elevating travel to an art form',
      rating: 4.9,
      logo: '/assets/agency3.jpg',
    },
    {
      name: 'EcoTravel Co.',
      description: 'Sustainable adventures for conscious travelers',
      rating: 4.7,
      logo: '/assets/agency4.jpg',
    },
  ];
}
