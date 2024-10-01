import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { UserAuthService } from '../auth/services/user/user-auth.service';
import { AdminAuthService } from '../auth/services/admin/admin-auth.service';
import { AgencyAuthService } from '../auth/services/agency/agency-auth.service';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const userAuthService = inject(UserAuthService);
  const adminAuthService = inject(AdminAuthService);
  const agencyAuthService = inject(AgencyAuthService);

  const publicRoutes = ['/agency/isExistingMail', '/agency/isExistingName', '/user/isExistingMail'];

  const isPublicRoute = publicRoutes.some(route => req.url.includes(route));

  if (isPublicRoute) {
    console.log('yes');
    return next(req);
  }

  let authService;
  if (req.url.includes('/admin')) {
    authService = adminAuthService;
  } else if (req.url.includes('/agency')) {
    authService = agencyAuthService;
  } else {
    authService = userAuthService;
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refresh')) {
        return authService.refreshToken().pipe(
          switchMap((newAccessToken: string) => {
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return next(clonedReq);
          })
        );
      }

      return throwError(error);
    })
  );
};
