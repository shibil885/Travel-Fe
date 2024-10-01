import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../shared/services/admin-service.service';
import { RouterModule } from '@angular/router';
import { ListTableComponent } from './list-table/list-table.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agencies',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    ListTableComponent,
    MatIconModule,
    RouterModule,
    DialogComponent,
  ],
  templateUrl: './agencies.component.html',
  styleUrl: './agencies.component.css',
})
export class AgenciesComponent {
  agencies: any = [];
  columns = [
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'contact.email' },
    { title: 'Phone', key: 'contact.phone' },
    { title: 'Verified', key: 'isVerified' },
    { title: 'Status', key: 'isActive' },
    { title: 'Confirmed', key: 'isConfirmed' },
  ];
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminService.getAllAgencies().subscribe((data) => {
      this.agencies = data.agencies;
    });
  }

  changeStatus(agency: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { status: agency.isActive ? 'block' : 'unblock' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const action = agency.isActive ? 'block' : 'unblock';
        this.adminService.changeAgencyStatus(agency._id, action).subscribe(() => {
          this.showToast(`Agency successfully ${action}ed`, 'success');
          this.refreshUsers();
        }); 
      }
    });
  }
  confirmation(agency: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { status: agency.isConfirmed ? 'Declin' : 'Confirm' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const action = agency.isConfirmed ? 'declin' : 'confirm';
        this.adminService.confirmation(agency._id, action).subscribe(() => {
          this.showToast(`Agency successfully ${action}ed`, 'success');
          this.refreshUsers();
        }); 
      }
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

  refreshUsers() {
    this.adminService.getAllAgencies().subscribe((data) => {
      this.agencies = data.agencies;
    });
  }
}
