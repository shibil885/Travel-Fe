import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../shared/services/admin-service.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { FilterData } from '../../../interfaces/filterData.interface';
import { CommonModule } from '@angular/common';
import { ReusableTableComponent } from '../../../shared/components/table/table.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    FilterComponent,
    ReusableTableComponent,
    DialogComponent,
    SearchComponent,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  showFilters!: boolean;
  userHeaders = [
    { label: 'Name', key: 'username' },
    { label: 'Email', key: 'email' },
    { label: 'Verified', key: 'isVerified' },
    { label: 'Active', key: 'isActive' },
  ];

  users: any = [];
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getAllUsers().subscribe((data) => {
      this.users = data.users;
    });
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
      panelClass: 'custom-dialog-container',
    });

    dialogRef.componentInstance.filterDataEvent.subscribe(
      (filterData: FilterData) => {
        this.onFilter(filterData);
      }
    );
  }

  onFilter(filterData: FilterData) {
    this.adminService.getFilteredData(filterData,'user').subscribe((response) => {
      this.users = response;
    });
  }
  onSearch(searchText: string) {
    if (searchText.length == 0) {
    this.fetchUsers();
    return
    }
    this.adminService.searchUsers(searchText, 'user').subscribe((res) => {
      this.users  = res
    })
  }
}
