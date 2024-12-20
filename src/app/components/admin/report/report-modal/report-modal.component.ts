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

@Component({
  selector: 'app-report-detail-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatIconModule],
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.css',
})
export class ReportDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReportDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReport,
    private reportService: ReportService
  ) {}

  updateStatus(status: string) {
    this.reportService
      .updateReportStatus(this.data._id, status)
      .subscribe(() => {
        // this.data.status = status;
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
}
