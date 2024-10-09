import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AgencyService } from '../../../shared/services/agency.service';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PackageService } from '../../../shared/services/package.service';
import { AddPackageComponent } from './add-package/add-package.component';
import { SinglePackageComponent } from './single-package/single-package.component';

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
})
export class PackagesComponent {
  renderTableRelatedDatas!: boolean;
  renderAddForm!: boolean;
  renderEditForm!: boolean;
  renderSinglePackage!: boolean;
  singlePackage!: any;
  packages!: any;
  constructor(private packageService: PackageService) {}
  ngOnInit(): void {
    this.renderTableRelatedDatas = true;
    console.log('get called');
    this.packageService.getPackages().subscribe((res: any) => {
      console.log(res.packages);
      this.packages = res.packages
    }); 
  }

  addPackage() {
    this.renderTableRelatedDatas = false;
    this.renderAddForm = true;
  }

  viewPackageDetails(packag: any) {
    this.renderTableRelatedDatas = false;
    this.renderSinglePackage = true;
    this.singlePackage = packag;
  }

  onSearch(searchText: string) {
    console.log(searchText);
  }

  showSortAndFilter() {}  
}
