import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserAuthService } from '../../services/user/user-auth.service';

export const userGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
  console.log('is access token exist or not, from authguard', accessToken);

  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      switchMap((isValid: boolean) => {
        console.log('is valid from switchmap', isValid);
        if (isValid) {
          return of(true); 
        } else {
          return authService.refreshToken().pipe(
            switchMap((newAccessToken: string) => {
              authService.setAccessToken(newAccessToken);
              return authService.validateToken(newAccessToken).pipe(
                map((isValidAfterRefresh: boolean) => {
                  console.log('is valid or not after refresh the token', isValidAfterRefresh);
                  if (isValidAfterRefresh) {
                    return true; 
                  } else {
                    handleUnauthenticated(router); 
                    return false; // Deny access
                  }
                }),
                catchError(() => {
                  handleUnauthenticated(router);
                  return of(false); // Deny access
                })
              );
            }),
            catchError(() => {
              handleUnauthenticated(router);
              return of(false); // Deny access
            })
          );
        }
      }),
      catchError(() => {
        handleUnauthenticated(router);
        return of(false); // Deny access
      })
    );
  }

  handleUnauthenticated(router);
  return of(false); // Deny access
};


function handleUnauthenticated(router: Router): void {
  router.navigate(['/login']);
  return
}
