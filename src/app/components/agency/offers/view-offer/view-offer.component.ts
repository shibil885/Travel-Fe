import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../../../shared/services/offer.service';
import { IOffer } from '../../../../interfaces/offer.interface';
import { ToastService } from '../../../../shared/services/toaster.service';
import { IPackage } from '../../../../interfaces/package.interface';

@Component({
  selector: 'app-view-offer',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule],
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

  getOfferData() {
    if (!this.selectedOfferId) {
      this._toastService.showToast('Somthing went wrong', 'error');
      this._router.navigate(['agency/offers']);
    }
    this._OfferService.getOneOffer(this.selectedOfferId).subscribe((res) => {
      if (res.success) {
        this.selectedOffer = res.offer;
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
        this.packages = res.packages;
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
        console.log('---->', res.packages);
        this.applycable_Packages = res.packages;
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
          this.getApplicableOffers()
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
          this.getApplicableOffers()
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
