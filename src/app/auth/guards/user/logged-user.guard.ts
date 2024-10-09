import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserAuthService } from '../../services/user/user-auth.service';

export const userLoggedGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
  console.log('accessToken exist or not, from logged', accessToken);

  if (accessToken) {  
    return authService.validateToken(accessToken).pipe(
      switchMap((isValid: boolean) => {
        if (isValid) {
          router.navigate(['/home']);
          return of(false);
        } else {
          return authService.refreshToken().pipe(
            switchMap((newAccessToken: string) => {
              authService.setAccessToken(newAccessToken);
              return authService.validateToken(newAccessToken).pipe(
                map((isValidAfterRefresh: boolean) => {
                  if (isValidAfterRefresh) {
                    router.navigate(['/home']);
                    return false;
                  } else {
                    // handleUnauthenticated(router);
                    return false; 
                  }
                }),
                catchError(() => {
                  // handleUnauthenticated(router);
                  return of(false);
                })
              );
            }),
            catchError(() => {
              // handleUnauthenticated(router);
              return of(false);
            })
          );
        }
      }),
      catchError(() => {
        // handleUnauthenticated(router);
        return of(false);
      })
    );
  } else {
    console.log('logged');
    return of(true); 
  }
};


function handleUnauthenticated(router: Router): void {
  console.log('function invoked from logged')
  router.navigate(['/login']);
  return
}
