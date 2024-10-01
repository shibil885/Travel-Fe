import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../shared/services/admin-service.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListTableComponent } from './list-table/list-table.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    ListTableComponent,
    DialogComponent,
    MatIconModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  columns = [
    { title: 'Email', key: 'email' },
    { title: 'Phone', key: 'profile.phone' },
    { title: 'Address', key: 'profile.address' },
    { title: 'Verified', key: 'is_Verified' },
    { title: 'Status', key: 'is_Active' },
  ];

  users: any[] = [];
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((data) => {
      this.users = data.users;
    });
  }
  changeStatus(user: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { status: user.is_Active ? 'block' : 'unblock' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const action = user.is_Active ? 'block' : 'unblock';
        this.adminService.changeUserStatus(user._id, action).subscribe(() => {
          this.showToast(`User successfully ${action}ed`, 'success');
          this.refreshUsers();
        });
      }
    });
  }
  showToast(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, '👋', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-success' : 'snack-error',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  refreshUsers() {
    this.adminService.getAllUsers().subscribe((data) => {
      this.users = data.users;
    });
  }
}
