import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  notifications = [
    { message: 'Your booking has been confirmed!', time: '2 hours ago' },
    { message: 'New package added: Maldives Tour!', time: '1 day ago' },
    { message: 'Your refund has been processed.', time: '3 days ago' },
  ];

  constructor(public dialogRef: MatDialogRef<NotificationComponent>) {}

  closeModal() {
    this.dialogRef.close();
  }
}
