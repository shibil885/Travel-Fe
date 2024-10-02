import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AgencyAuthService } from '../../services/agency/agency-auth.service';
import { AdminAuthService } from '../../services/admin/admin-auth.service';

export const adminLoggedGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      switchMap((isValid: boolean) => {
        if (isValid) {
          handleAuthenticated(router);
          return of(false);
        } else {
          return authService.refreshToken().pipe(
            switchMap((newAccessToken: string) => {
              authService.setAccessToken(newAccessToken);
              return authService.validateToken(newAccessToken).pipe(
                map((isValid: boolean) => {
                  if (isValid) {
                    handleAuthenticated(router);
                    return false;
                  } else {
                    return true;
                  }
                })
              );
            }),
            map(() => true)
          );
        }
      })
    );
  }
  return of(true);
};

function handleAuthenticated(router: Router): void {
  router.navigate(['/admin']);
}
