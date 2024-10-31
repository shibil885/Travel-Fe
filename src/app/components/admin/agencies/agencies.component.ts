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
import { FilterData } from '../../../interfaces/filterData.interface';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-agencies',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    FilterComponent,
    DialogComponent,
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
  agencies: any = [];
  totalAgencies: number = 0;
  currentPage: number = 1;
  limit: number = 5;
  
  agencyHeaders = [
    { label: 'Agency Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Verified', key: 'isVerified' },
    { label: 'Active', key: 'isActive' },
    { label: 'Confirmed', key: 'isConfirmed' },
  ];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchAgencies(this.currentPage);
  }

  fetchAgencies(page: number) {
    this.adminService.getAllAgencies(page, this.limit).subscribe((response) => {
      this.agencies = response.agencies;
      this.currentPage = response.currentPage;
      this.totalAgencies = response.totalAgencies;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchAgencies(page);
  }

  showToast(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, '😒', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-success' : 'snack-error',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showSortAndFilter() {
    const dialogRef = this.dialog.open(FilterComponent, {
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
    this.adminService
      .getFilteredData(filterData, 'agency')
      .subscribe((response) => {
        this.agencies = response;
      });
  }

  onSearch(searchText: string) {
    if (searchText.length === 0) {
      this.fetchAgencies(this.currentPage);
      return;
    }
    this.adminService.searchUsers(searchText, 'agency').subscribe((res) => {
      this.agencies = res;
    });
  }
}
