import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../service/service.service';
import { Role } from '../../enum/role.enum';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);
  const injectedRouter = inject(Router);
  const requestedRole = route.data['role'];

  return authService.validateToken().pipe(
    switchMap((res) => {
      if (res.role === requestedRole && res.valid) {
        return of(true);
      } else if (!res.valid) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            if (response.role === requestedRole && response.isRefreshed)
              return of(true);
            else handleUnauthorizedAccess(injectedRouter, res.role);
            return of(false);
          }),
          catchError((error) => {
            console.error('Error during token validation:', error);
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
      handleUnauthenticated(injectedRouter, requestedRole);
      return of(false);
    })
  );
};

function handleUnauthenticated(router: Router, role: string): void {
  if (role === Role.USER) router.navigate([`/login`]);
  else router.navigate([`/${role}/login`]);
}

function handleUnauthorizedAccess(router: Router, role: string): void {
  switch (role) {
    case Role.ADMIN:
      router.navigate(['/admin']);
      break;
    case Role.USER:
      router.navigate(['/home']);
      break;
    case Role.AGENCY:
      router.navigate(['/agency']);
      break;
    default:
      router.navigate(['/login']);
      break;
  }
}
