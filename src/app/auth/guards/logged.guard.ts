import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { AuthService } from '../service/service.service';

export const preventGuard: CanActivateFn = (route): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = route.data['role'];

  const accessToken = authService.getAccessToken();
  if (accessToken) {
    return authService.validateToken().pipe(
      switchMap((res) => {
        if (res.valid && res.role === role) {
          router.navigate([`/${role}/home`]);
          return of(false);
        } else if (res.valid && res.role !== role) {
          handleUnauthorized(router, role);
          return of(false);
        } else {
          return authService.refreshToken().pipe(
            switchMap((newAccessToken: string) => {
              authService.setAccessToken(newAccessToken);
              return authService.validateToken().pipe(
                map((res) => {
                  if (res.valid && res.role === role) {
                    router.navigate([`/${role}/home`]);
                    return false;
                  } else if (res.valid && res.role !== role) {
                    handleUnauthorized(router, role);
                    return false;
                  } else {
                    handleUnauthenticated(router, role);
                    return true;
                  }
                }),
                catchError((error) => {
                  if (error.status === 0) {
                    console.error('Server is unreachable, breaking the loop');
                  }
                  handleUnauthenticated(router, role);
                  return of(true);
                })
              );
            }),
            catchError((error) => {
              if (error.status === 0) {
                console.error('Server is unreachable, breaking the loop');
              }
              handleUnauthenticated(router, role);
              return of(true);
            })
          );
        }
      }),
      catchError((error) => {
        if (error.status === 0) {
          console.error('Server is unreachable, breaking the loop');
        }
        handleUnauthenticated(router, role);
        return of(true);
      })
    );
  }
  return of(true);
};

function handleUnauthenticated(router: Router, role: string) {
  if (role === 'user') {
    router.navigate([`/login`]);
  } else {
    router.navigate([`/${role}/login`]);
  }
}

function handleUnauthorized(router: Router, role: string) {
  switch (role) {
    case 'user':
      router.navigate([`/home`]);
      break;
    case 'admin':
      router.navigate([`${role}/home`]);
      break;
    case 'agency':
      router.navigate([`${role}/home`]);
      break;
    default:
      router.navigate([`${role}/home`]);
      break;
  }
}
