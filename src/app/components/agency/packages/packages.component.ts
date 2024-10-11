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
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    SideBarComponent,
    HeaderComponent,
    AddPackageComponent,
    SearchComponent,
    SinglePackageComponent,
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
  packages!: any;
  constructor(private packageService: PackageService) {}
  ngOnInit(): void {
    this.renderTableDatas();
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

  renderTableDatas() {
    this.renderTableRelatedDatas = true;
    this.packageService.getPackages().subscribe((res: any) => {
      this.packages = res.packages;
    });
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
    this.renderTableDatas();
  }
}
