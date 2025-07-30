import { Component } from '@angular/core';
import { IPackage } from '../../../interfaces/package/package.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { Store } from '@ngrx/store';
import {
  bookingPage,
  showSinglePackage,
} from '../../../store/user/user.action';
import { ToastService } from '../../../shared/services/toaster.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    PaginationComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class PackagesComponent {
  packages: IPackage[] = [];
  currentPage: number = 1;
  limit: number = 6;
  totalPackages: number = 10;
  searchTerm: string = '';
  numberOfDays: number = 30;
  numberOfPerson!: number;

  constructor(
    private _userService: UserService,
    private _store: Store,
    private _toastService: ToastService,
    private _localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this._localStorage.removeItem('_packageId');
    this.fetchAllPackages();
  }

  fetchAllPackages() {
    this._userService
      .getPackages(this.currentPage, this.limit)
      .subscribe((res) => {
        const data = res.data;
        if (!res.data) {
          this.packages = [];
          this.totalPackages = 0;
          return;
        }
        this.packages = res.data.packages;
        this.currentPage = res.data.currentPage;
        this.totalPackages = res.data.packagesCount;
      });
  }

  getStarCounts(averageRating: string) {
    const fullStars = Math.floor(Number(averageRating));
    const hasHalfStar = Number(averageRating) % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(Number(averageRating));

    return {
      fullStars,
      hasHalfStar,
      emptyStars,
    };
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchAllPackages();
  }

  filterPackages() {}

  sortPackages(criteria: 'price' | 'rating') {}

  showSinglePackage(id: string | undefined) {
    if (id) {
      this._store.dispatch(showSinglePackage({ id: id }));
      return;
    }
    this._toastService.showToast('Something went wrong', 'error');
    return;
  }

  bookPackage(id: string | undefined) {
    if (id) {
      this._store.dispatch(bookingPage({ id }));
      this._localStorage.setItem('_packageId', id);
      return;
    }
    this._toastService.showToast('Something went wrong', 'error');
    return;
  }
}
