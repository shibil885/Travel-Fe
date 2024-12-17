import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportType } from '../../../enum/report.enum';

@Component({
  selector: 'app-report-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.css',
})
export class ReportModalComponent {
  initialModal: boolean = true;
  postReport: boolean = false;
  commantReport: boolean = false;
  packageReport: boolean = false;
  agencyReport: boolean = false;
  selectedReason: string = '';
  reportDescription: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: string,
    private _dialogRef: MatDialogRef<ReportModalComponent>
  ) {}
  
  onReport() {
    switch (this._data) {
      case ReportType.POST:
        this.initialModal = false;
        this.postReport = true;
        break;
      case ReportType.COMMENT:
        this.initialModal = false;
        this.commantReport = true;
        break;
      case ReportType.PACKAGE:
        this.initialModal = false;
        this.packageReport = true;
        break;
      case ReportType.AGENCY:
        this.initialModal = false;
        this.agencyReport = true;
        break;
    }
  }

  onCancel() {
    this._dialogRef.close();
  }
  onSubmitReport() {}
}
