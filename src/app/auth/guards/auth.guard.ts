import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../service/service.service';
import { Role } from '../../enum/role.enum';
import { SocketService } from '../../shared/services/socket/socket.service';

export const authGuard: CanActivateFn = (route): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const socket = inject(SocketService);
  const role: Role = route.data['role'];

  return authService.validateToken().pipe(
    switchMap((res) => {
      if (res.valid && res.role === role) {
        if (role === Role.USER) {
          socket.userLoged(res.id)
        }
        return of(true);
      } else if (res.valid && res.role !== role) {
        handleUnauthorizedAccess(router, res.role);
        return of(false);
      } else {
        return authService.refreshToken().pipe(
          map((refreshRes) => {
            if (refreshRes.isRefreshed && refreshRes.role === role) {
              if (role === Role.USER) {
                socket.userLoged(res.id)
              }
              return true;
            } else if (refreshRes.isRefreshed && refreshRes.role !== role) {
              handleUnauthorizedAccess(router, refreshRes.role);
              return false;
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

function handleUnauthorizedAccess(router: Router, role: Role): void {
  const redirectUrl = role === Role.USER ? '/home' : `/${role}`;
  router.navigate([redirectUrl]);
}
