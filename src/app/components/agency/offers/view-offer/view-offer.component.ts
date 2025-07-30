import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../../../shared/services/offer.service';
import { ToastService } from '../../../../shared/services/toaster.service';
import { IPackage } from '../../../../interfaces/package/package.interface';
import { DaysLeftPipe } from '../../../../shared/pipes/days-left.pipe';
import { IOffer } from '../../../../interfaces';

@Component({
  selector: 'app-view-offer',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule, DaysLeftPipe],
  templateUrl: './view-offer.component.html',
  styleUrl: './view-offer.component.css',
})
export class ViewOfferComponent {
  selectedOfferId!: string | null;
  selectedOffer!: IOffer;
  packages: IPackage[] = [];
  applycable_Packages: IPackage[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _OfferService: OfferService,
    private readonly _router: Router,
    private readonly _toastService: ToastService
  ) {}

  async ngOnInit() {
    this.selectedOfferId = this._activatedRoute.snapshot.paramMap.get('id');
    if (!this.selectedOfferId) {
      this._toastService.showToast('Somthing went wrong', 'error');
      this._router.navigate(['agency/offers']);
      return;
    }
    try {
      await this.getOfferData();
      await this.getPackagesForApplyOffer();
      this.getApplicableOffers();
    } catch (error) {
      this._toastService.showToast('Error fetching data', 'error');
      this._router.navigate(['agency/offers']);
    }
  }
  get getDate() {
    return new Date();
  }
  getOfferData() {
    if (!this.selectedOfferId) {
      this._toastService.showToast('Somthing went wrong', 'error');
      this._router.navigate(['agency/offers']);
    }
    this._OfferService.getOneOffer(this.selectedOfferId).subscribe((res) => {
      if (res.success && res.data) {
        this.selectedOffer = res.data?.offer;
      }
    });
  }

  getPackagesForApplyOffer() {
    if (!this.selectedOfferId) {
      this._toastService.showToast('Somthing went wrong', 'error');
      this._router.navigate(['agency/offers']);
      return;
    }
    this._OfferService
      .getPackagesForApplyOffer(this.selectedOfferId)
      .subscribe((res) => {
        if (res.info) {
          this._toastService.showToast(res.message, 'info');
        }
        if (res.data) this.packages = res.data?.packages;
        return;
      });
  }

  getApplicableOffers() {
    if (!this.selectedOfferId) {
      this._toastService.showToast('Somthing went wrong', 'error');
      this._router.navigate(['agency/offers']);
      return;
    }
    this._OfferService
      .applicableOffer(this.selectedOfferId)
      .subscribe((res) => {
        if (res.data) this.applycable_Packages = res.data?.packages;
        return;
      });
  }

  applyOffer(packageId: string | undefined) {
    if (!this.selectedOfferId || !packageId) {
      this._toastService.showToast('Somthing went wrong', 'error');
      this._router.navigate(['agency/offers']);
      return;
    }
    this._OfferService
      .applyOffer(this.selectedOfferId, packageId)
      .subscribe((res) => {
        if (res.success) {
          this._toastService.showToast(res.message, 'success');
          this.getOfferData();
          this.getPackagesForApplyOffer();
          this.getApplicableOffers();
        }
      });
  }

  removeOffer(packageId: string | undefined) {
    if (!this.selectedOfferId || !packageId) {
      this._toastService.showToast('Somthing went wrong', 'error');
      this._router.navigate(['agency/offers']);
      return;
    }
    this._OfferService
      .removeOffer(this.selectedOfferId, packageId)
      .subscribe((res) => {
        if (res.success) {
          this._toastService.showToast(res.message, 'success');
          this.getOfferData();
          this.getPackagesForApplyOffer();
          this.getApplicableOffers();
        }
      });
  }

  toggleOfferStatus(): void {
    if (!this.selectedOfferId) {
      this._toastService.showToast('Somthing went wrong', 'error');
      this._router.navigate(['agency/offers']);
      return;
    }
    if (!this.selectedOffer) return;
    this.selectedOffer.isActive = !this.selectedOffer.isActive;
    // this._OfferService.updateOfferStatus(this.selectedOffer._id, this.selectedOffer.isActive).subscribe({
    //   next: () => {
    //     const status = this.selectedOffer?.isActive ? 'activated' : 'deactivated';
    //     this._toastService.showToast(`Offer successfully ${status}`, 'success');
    //   },
    //   error: (err) => {
    //     this._toastService.showToast('Failed to update offer status', 'error');
    //     this.selectedOffer.isActive = !this.selectedOffer.isActive; // Revert status on error
    //   }
    // });
  }
}
