import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserAuthService } from '../../services/user/user-auth.service';

export const userGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
  console.log('ttttttttttto', accessToken)
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
  return of(true); 
};

function handleUnauthenticated(router: Router): void {
  router.navigate(['/login']);
}
