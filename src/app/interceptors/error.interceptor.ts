import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../shared/services/toaster.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      console.error('Error intercepted:', error);
      if (error.status === 0) {
        toastService.showToast(
          'Network error occurred. Please try again.',
          'error'
        );
      } else if (error.status === 500) {
        toastService.showToast(
          'Server error occurred. Please try later.',
          'error'
        );
      } else if (error.status === 401) {
        toastService.showToast(error.error.message, 'error');
      } else if (error.status === 403) {
        toastService.showToast(
          'Forbidden. You do not have access to this resource.',
          'error'
        );
      } else if (error.status === 404) {
        toastService.showToast(
          'Resource not found. Please try again.',
          'error'
        );
      } else {
        console.log('============>', error);
        toastService.showToast(
          `${error.error.message || 'An error occurred.'}`,
          error.error.warning ? 'warning' : 'error'
        );
      }
      return throwError(() => error);
    })
  );
};
