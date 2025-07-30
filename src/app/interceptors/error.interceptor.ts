import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../shared/services/loading.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from '../shared/services/toaster.service';

export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const toastService = inject(ToastService);
  const skipLoding = req.headers.get('skip-loading');
  if (!skipLoding) {
    loadingService.showLoading();
  }

  return next(req).pipe(
    finalize(() => loadingService.hideLoading()),
    catchError((error) => {
      if (error.status === 0) {
        toastService.showToast(
          'Network error occurred. Please try again.',
          'error'
        );
      } else if (error.status === 500) {
        toastService.showToast(
          error.error.message || 'Server error occurred. Please try later.',
          'error'
        );
      } else if (error.status === 401) {
        toastService.showToast(error.error.message, 'error');
      } else if (error.status === 403) {
        toastService.showToast(
          error.error.message
            ? error.error.message
            : 'Forbidden. You do not have access to this resource.',
          'error'
        );
      } else if (error.status === 404) {
        toastService.showToast(
          error.error.message,
          error.error.info ? 'info' : 'error'
        );
      } else {
        toastService.showToast(
          `${error.error.message || 'An error occurred.'}`,
          error.error.warning ? 'warning' : error.error.info ? 'info' : 'error'
        );
      }
      return throwError(() => error);
    })
  );
};
