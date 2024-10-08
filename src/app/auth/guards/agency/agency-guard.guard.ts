import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AgencyAuthService } from '../../services/agency/agency-auth.service';

export const agencyGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AgencyAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();

  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      switchMap((isValid: boolean) => {
        if (isValid) {
          return of(true);
        } else {
          return authService.refreshToken().pipe(
            switchMap((newAccessToken: string) => {
              authService.setAccessToken(newAccessToken);
              return authService.validateToken(newAccessToken).pipe(
                map((isValid: boolean) => {
                  if (isValid) {
                    return true; 
                  } else {
                    handleUnauthenticated(router); 
                    return false;
                  }
                })
              );
            })
          );
        }
      })
    );
  }

  handleUnauthenticated(router);
  return of(false); 
};

function handleUnauthenticated(router: Router): void {
  router.navigate(['/agency/login']);
}
