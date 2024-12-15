import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { CommonModule } from '@angular/common';
import { IPackage } from '../../../interfaces/package.interface';
import { PackageService } from '../../../shared/services/package.service';

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
        this.offerPackages = res.packages;
      }
    });
  }
  private _fetchTopBookedPackages() {
    this._packageService.getTopBookedPackages().subscribe((res) => {
      if (res.success) {
        console.log(res);
        this.topBookedPackages = res.packages;
      }
    });
  }
}
