// src/app/interceptors/error-interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../shared/services/toaster.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0) {
        toastService.showToast('Network error occurred. Please try again.', 'error');
      }  else if (error.status === 500) {
        toastService.showToast('Server error occurred. Please try later.', 'error');
      } else {
        toastService.showToast(`${error.error.message}`, 'error');
      }

      return throwError(() => 'error eee');
    })
  );
};
