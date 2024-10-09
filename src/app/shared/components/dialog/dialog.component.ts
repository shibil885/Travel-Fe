import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  status: string = 'block'; 

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

