
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  toastState = this.toastSubject.asObservable();

  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toastSubject.next({ message, type });
  }
}
