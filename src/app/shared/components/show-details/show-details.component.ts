import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin-service.service';
import { ToastService } from '../../services/toaster.service';
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
    private _dialogRef: MatDialogRef<ShowDetailsComponent>,
    private _adminService: AdminService,
    private _toasterService: ToastService
  ) {
    this.isUser = !!data.username;
  }

  toggleActive(id: string, isActiveValue: boolean) {
    const action = isActiveValue ? 'block' : 'unblock';
    if (this.isUser) {
      this._adminService.changeUserStatus(id, action).subscribe((res) => {
        const data = res.data;
        if (data && res.success) {
          this._toasterService.showToast(res.message, 'success');
          this.data.isActive = data.isActive;
        }
      });
      return;
    }
    this._adminService.changeAgencyStatus(id, action).subscribe((res) => {
      const data = res.data;
      if (data && res.success) {
        this._toasterService.showToast(res.message, 'success');
        this.data.isActive = data.isActive;
      }
    });
    return;
  }

  toggleConfirmed(agencyId: string, isConfirmedValue: boolean) {
    const action = isConfirmedValue ? 'decline' : 'confirm';
    this._adminService
      .changeAgencyConfirmation(agencyId, action)
      .subscribe((res) => {
        const data = res.data;
        if (data && res.success) {
          this._toasterService.showToast(res.message, 'success');
          this.data.isConfirmed = data.isConfirmed;
        }
      });
  }
  closeComponent() {
    this._dialogRef.close();
  }
}
