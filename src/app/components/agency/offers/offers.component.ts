import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OfferService } from '../../../shared/services/offer.service';
import { IOffer } from '../../../interfaces/offer.interface';
import { ToastService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    SearchComponent,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent {
  offers!: IOffer[];
  currentPage: number = 1;
  totalOffers!: number;
  limit: number = 5;

  constructor(
    private _OfferService: OfferService,
    private _router: Router,
    private readonly _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchOffers();
  }

  fetchOffers() {
    this._OfferService
      .getOffers(this.currentPage, this.limit)
      .subscribe((res) => {
        if (res.info) {
          this._toastService.showToast(res.message, 'info');
        }
        this.offers = res.offers;
        this.totalOffers = res.totalItems;
      });
  }
  addOffer() {
    this._router.navigate(['agency/addOffer']);
  }
  onPageChange(page: number) {}
  onSearch(text: string) {}
}
