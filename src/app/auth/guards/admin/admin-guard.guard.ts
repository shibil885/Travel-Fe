import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AdminAuthService } from '../../services/admin/admin-auth.service';

export const adminGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AdminAuthService); 
  const router = inject(Router);
  const accessToken = authService.getAccessToken();

  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      switchMap((isValid: boolean) => {
        if (isValid) {
          console.log('is he have valid token', isValid);
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
  router.navigate(['/admin/login']);
}
