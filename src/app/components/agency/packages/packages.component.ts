import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PackageService } from '../../../shared/services/package.service';
import { AddPackageComponent } from './add-package/add-package.component';
import { SinglePackageComponent } from './single-package/single-package.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { IPackage } from '../../../interfaces/package.interface';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    SideBarComponent,
    HeaderComponent,
    AddPackageComponent,
    SearchComponent,
    SinglePackageComponent,
    PaginationComponent,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PackagesComponent {
  renderTableRelatedDatas!: boolean;
  renderAddForm!: boolean;
  renderSinglePackage!: boolean;
  singlePackage!: any;
  packages: IPackage[] = [];
  limit: number = 5;
  totalPages!: number;
  currentPage: number = 1;
  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.renderTableData();
  }

  ngOnDestroy(): void {
    this.renderTableRelatedDatas = true;
    this.renderAddForm = false;
    this.renderSinglePackage = false;
  }

  addPackage() {
    this.renderTableRelatedDatas = false;
    this.renderAddForm = true;
  }

  renderTableData() {
    this.renderTableRelatedDatas = true;
    this.packageService
      .getPackages(this.currentPage, this.limit)
      .subscribe((res) => {
        this.packages = res.packages;
        this.currentPage = res.currentPage;
        this.totalPages = res.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.renderTableData()
  }

  viewPackageDetails(packag: any) {
    this.renderTableRelatedDatas = false;
    this.renderAddForm = false;
    this.renderSinglePackage = true;
    this.singlePackage = packag;
  }

  onSearch(searchText: string) {
    console.log(searchText);
  }

  showSortAndFilter() {}

  onAddFormClosedOrCompleted() {
    this.renderAddForm = false;
    this.renderSinglePackage = false;
    this.renderTableData();
  }
}
