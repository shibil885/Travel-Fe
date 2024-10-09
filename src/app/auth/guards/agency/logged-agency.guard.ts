import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AgencyAuthService } from '../../services/agency/agency-auth.service';

export const agencyLoggedGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AgencyAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();

  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      switchMap((isValid: boolean) => {
        if (isValid) {
          router.navigate(['/agency/home']);
          return of(false);
        } else {
          return authService.refreshToken().pipe(
            switchMap((newAccessToken: string) => {
              authService.setAccessToken(newAccessToken);
              return authService.validateToken(newAccessToken).pipe(
                map((isValidAfterRefresh: boolean) => {
                  if (isValidAfterRefresh) {
                    router.navigate(['/agency/home']);
                    return false;
                  } else {
                    handleUnauthenticated(router);
                    return true; 
                  }
                }),
                catchError(() => {
                  handleUnauthenticated(router);
                  return of(true);
                })
              );
            }),
            catchError(() => {
              handleUnauthenticated(router);
              return of(true);
            })
          );
        }
      }),
      catchError(() => {
        handleUnauthenticated(router);
        return of(true);
      })
    );
  }

  return of(true);
};

function handleUnauthenticated(router: Router): void {
  router.navigate(['/agency/login']);
}
