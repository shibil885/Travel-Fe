import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin-service.service';
@Component({
  selector: 'app-show-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css',
})
export class ShowDetailsComponent {
  isUser!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShowDetailsComponent>,
    private adminService: AdminService
  ) {
    this.isUser = !!data.username;
  }
  toggleActive(id: string, isActiveValue: boolean) {
    const action = isActiveValue ? 'block' : 'unblock';
    this.adminService.changeUserStatus(id, action).subscribe(() =>{
      this.data.isActive = !this.data.isActive;
    })
  }
  toggleConfirmed(id: string, isConfirmedValue: boolean) {
    const action = isConfirmedValue ? 'declin' : 'confirm';
    this.adminService.confirmation(id, action).subscribe(() => {
      this.data.isConfirmed = !this.data.isConfirmed;
    })
  }
  closeComponent() {
    this.dialogRef.close();
  }
}
