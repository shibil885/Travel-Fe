import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IPackage } from '../../../interfaces/package.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { Store } from '@ngrx/store';
import {
  bookingPage,
  showSinglePackage,
} from '../../../store/user/user.action';
import { ToastService } from '../../../shared/services/toaster.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    SearchComponent,
    PaginationComponent,
    RouterLink,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
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
    private userPackages: UserService,
    private store: Store,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.fetchAllPackages();
  }

  fetchAllPackages() {
    this.userPackages
      .getPackages(this.currentPage, this.limit)
      .subscribe((res) => {
        this.packages = res.packages;
        this.currentPage = res.currentPage;
        this.totalPackages = res.packagesCount;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchAllPackages();
  }
  filterPackages() {}

  sortPackages(criteria: 'price' | 'rating') {}

  showSinglePackage(id: string | undefined) {
    if (id) {
      this.store.dispatch(showSinglePackage({ id: id }));
      return;
    }
    this.toastService.showToast('somthing went wrong', 'error');
    return;
  }
  bookPackage(id: string | undefined) {
    if (id) {
      this.store.dispatch(bookingPage({ id }));
      return;
    }
    this.toastService.showToast('somthing went wrong', 'error');
    return;
  }
}
