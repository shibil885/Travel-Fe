import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../shared/services/admin-service.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { CommonModule } from '@angular/common';
import { ReusableTableComponent } from '../../../shared/components/table/table.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { IUser } from '../../../models/user.model';
import { FilterData } from '../../../interfaces';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    ReusableTableComponent,
    SearchComponent,
    MatIconModule,
    CommonModule,
    PaginationComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users: IUser[] = [];
  totalUsers: number = 0;
  currentPage: number = 1;
  limit: number = 5;

  showFilters!: boolean;
  userHeaders = [
    { label: 'Name', key: 'username' },
    { label: 'Email', key: 'email' },
    { label: 'Verified', key: 'isVerified' },
    { label: 'Active', key: 'isActive' },
  ];

  constructor(
    private _adminService: AdminService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(page: number) {
    this._adminService.getAllUsers(page, this.limit).subscribe((response) => {
      const data = response.data;
      if (!data || !data.totalUsers) {
        this.totalUsers = 0;
        this.users = [];
        return;
      }
      this.totalUsers = data.totalUsers;
      this.users = data.users;
      this.currentPage = data.currentPage;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchUsers(this.currentPage);
  }

  showToast(message: string, type: 'success' | 'error') {
    this._snackBar.open(message, '😒', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-success' : 'snack-error',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showSortAndFilter() {
    const dialogRef = this._dialog.open(FilterComponent, {
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.componentInstance.filterDataEvent.subscribe(
      (filterData: FilterData) => {
        this.onFilter(filterData);
      }
    );
  }

  onFilter(filterData: FilterData) {
    this._adminService
      .getFilteredData(filterData, 'user')
      .subscribe((response) => {
        const data = response.data;
        if (data) {
          this.users = data.filteredData as IUser[];
          return;
        }
        this.users = [];
      });
  }
  onSearch(searchText: string) {
    if (searchText.length == 0) {
      this.fetchUsers(this.currentPage);
      return;
    }
    this._adminService.searchUsers(searchText, 'user').subscribe((res) => {
      this.users = res as IUser[];
    });
  }
}
