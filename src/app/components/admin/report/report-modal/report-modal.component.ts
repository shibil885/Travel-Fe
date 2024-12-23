import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ReportService } from '../../../../shared/services/report/report.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IReport } from '../../../../interfaces/report.interface';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toaster.service';

@Component({
  selector: 'app-report-detail-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.css',
})
export class ReportDetailDialogComponent {
  addReview: boolean = false;
  review: string = '';
  constructor(
    public dialogRef: MatDialogRef<ReportDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReport,
    private _reportService: ReportService,
    private _toastService: ToastService
  ) {}

  updateStatus(status: string) {
    this._reportService.statusChange(status, this.data._id).subscribe((res) => {
      if (res.success) {
        this._toastService.showToast(res.message, 'success');
        this.close();
      }
    });
  }

  close() {
    this.dialogRef.close(this.data);
  }

  getStatusClass() {
    return {
      pending: this.data.status === 'pending',
      reviewed: this.data.status === 'reviewed',
      resolved: this.data.status === 'resolved',
    };
  }

  onAddReview() {
    this.addReview = !this.addReview;
  }

  onSubmit() {
    this._reportService
      .submitAdminReview(this.review, this.data._id)
      .subscribe((res) => {
        if (res.success) {
          this._toastService.showToast(res.message, 'success');
          this.data.reviewComment = this.review;
          this.addReview = !this.addReview;
        }
      });
  }
}
