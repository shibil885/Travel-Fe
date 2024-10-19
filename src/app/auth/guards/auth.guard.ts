import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../service/service.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);
  const injectedRouter = inject(Router);
  const accessToken = authService.getAccessToken();
  const requestedRole = route.data['role'];

  console.log('Requested user role:', requestedRole);

  if (accessToken) {
    return authService.validateToken().pipe(
      switchMap((res) => {
        console.log('User in token', res);
        if (res.role === requestedRole && res.valid) {
          return of(true);
        } else if (!res.valid) {
          return authService.refreshToken().pipe(
            switchMap((newAccessToken: string) => {
              authService.setAccessToken(newAccessToken);
              return of(true);
            }),
            catchError((error) => {
              console.error('Error during token refresh:', error);
              if (error.status === 0) {
                console.error('Server is unreachable, breaking the loop');
              }
              handleUnauthenticated(injectedRouter, requestedRole);
              return of(false);
            })
          );
        } else {
          handleUnauthorizedAccess(injectedRouter, res.role);
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error during token validation:', error);
        if (error.status === 0) {
          console.error('Server is unreachable, breaking the loop');
        }
        handleUnauthenticated(injectedRouter, requestedRole);
        return of(false);
      })
    );
  }

  handleUnauthenticated(injectedRouter, requestedRole);
  return of(false);
};

function handleUnauthenticated(router: Router, role: string): void {
  if (role === 'user') {
    router.navigate([`/login`]);
  } else {
    router.navigate([`/${role}/login`]);
  }
}

function handleUnauthorizedAccess(router: Router, role: string): void {
  switch (role) {
    case 'admin':
      router.navigate(['/admin']);
      break;
    case 'user':
      router.navigate(['/home']);
      break;
    case 'agency':
      router.navigate(['/agency']);
      break;
    default:
      router.navigate(['/login']);
      break;
  }
}
