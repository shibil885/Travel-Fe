import { Component, OnInit, signal, computed } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../shared/services/admin-service.service';
import { RouterModule } from '@angular/router';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReusableTableComponent } from '../../../shared/components/table/table.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { IAgency } from '../../../models/agency.model';
import { FilterData } from '../../../interfaces';

@Component({
  selector: 'app-agencies',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,

    ReusableTableComponent,
    SearchComponent,
    PaginationComponent,
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css'],
})
export class AgenciesComponent implements OnInit {
  agencies: IAgency[] = [];
  totalAgencies: number = 0;
  currentPage: number = 1;
  limit: number = 5;
  isSearching: boolean = false;

  agencyHeaders = [
    { label: 'Agency Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Verified', key: 'isVerified' },
    { label: 'Active', key: 'isActive' },
    { label: 'Confirmed', key: 'isConfirmed' },
  ];

  constructor(
    private _adminService: AdminService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchAgencies(this.currentPage);
  }

  fetchAgencies(page: number) {
    this._adminService
      .getAllAgencies(page, this.limit)
      .subscribe((response) => {
        const data = response?.data;
        if (!data || !data.agencies) {
          this.agencies = [];
          this.totalAgencies = 0;
          return;
        }

        this.agencies = data.agencies;
        this.currentPage = data.currentPage ?? 1;
        this.totalAgencies = data.totalAgencies ?? 0;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchAgencies(page);
  }

  showSortAndFilter() {
    const dialogRef = this._dialog.open(FilterComponent, {
      height: 'auto',
      data: true,
      panelClass: 'custom-dialog-container',
      disableClose: false,
    });

    dialogRef.componentInstance.filterDataEvent.subscribe(
      (filterData: FilterData) => {
        this.onFilter(filterData);
      }
    );
  }

  onFilter(filterData: FilterData) {
    this._adminService
      .getFilteredData(filterData, 'agency')
      .subscribe((response) => {
        const data = response.data;
        if (data) {
          this.agencies = data.filteredData as IAgency[];
          return;
        }
        this.agencies = [];
      });
  }

  onSearch(searchText: string) {
    if (searchText.length === 0) {
      this.isSearching = false;
      this.fetchAgencies(this.currentPage);
      return;
    }

    this.isSearching = true;
    this._adminService.searchUsers(searchText, 'agency').subscribe(
      (res) => {
        const data = res.data;
        if (data) {
          this.agencies = data.users as IAgency[];
          return;
        }
        this.agencies = [];
      },
      () => {
        this.agencies = [];
      }
    );
  }
}
