import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserAuthService } from '../../services/user/user-auth.service';

export const authGuardFn: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      map((isValid: boolean) => {
        if (isValid) {
          return true; 
        } else {
          handleUnauthenticated(router); 
          return false;
        }
      }),
      catchError(() => {
        handleUnauthenticated(router); 
        return of(false);
      })
    );
  }


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
        }),
        catchError(() => {
          handleUnauthenticated(router); 
          return of(false); 
        })
      );
    }),
    catchError(() => {
      handleUnauthenticated(router);
      return of(false); 
    })
  );
};


function handleUnauthenticated(router: Router): void {
  router.navigate(['/login']); 
}
