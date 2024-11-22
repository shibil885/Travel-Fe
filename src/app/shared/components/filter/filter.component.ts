import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterData } from '../../../interfaces/filterData.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css'],
})
export class FilterComponent {
  isAgency: boolean = false;
  @Output() filterDataEvent = new EventEmitter<FilterData>();
  @Output() showOriginalData = new EventEmitter<void>();
  searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.isAgency = this._data;
    this.searchForm = this._fb.group({
      isActive: [true],
      isVerified: [true],
      isConfirmed: [true],
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.filterDataEvent.emit(this.searchForm.value);
      this._dialog.closeAll();
    }
  }

  resetForm(): void {
    this.searchForm.reset({
      isActive: true,
      isVerified: true,
      isConfirmed: true,
    });
  }

  closeModal() {
    this._dialog.closeAll();
  }
}
