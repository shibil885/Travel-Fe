// src/app/components/toast/toast.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toaster.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  toastMessages: ToastMessage[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState.subscribe((toast: ToastMessage) => {
      this.toastMessages.push(toast);
      setTimeout(() => this.removeToast(toast), 3000);
    });
  }

  removeToast(toast: ToastMessage) {
    this.toastMessages = this.toastMessages.filter(t => t !== toast);
  }
}
