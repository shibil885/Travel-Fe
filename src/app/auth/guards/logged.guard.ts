import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { AuthService } from '../service/service.service';
import { Role } from '../../enum/role.enum';

export const preventGuard: CanActivateFn = (route): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role: Role = route.data['role'];

  return authService.validateToken().pipe(
    switchMap((res) => {
      if (res.valid) {
        if (res.role === role) {
          role === Role.USER
            ? router.navigate([`/home`])
            : router.navigate([`/${res.role}`]);
          return of(false);
        } else {
          res.role === Role.USER
            ? router.navigate(['/home'])
            : router.navigate([`${res.role}`]);
          return of(false);
        }
      }
      return authService.refreshToken().pipe(
        map((refreshRes) => {
          if (refreshRes.isRefreshed) {
            if (refreshRes.role === role) {
              role === Role.USER
                ? router.navigate([`/home`])
                : router.navigate([`/${res.role}`]);
              return false;
            } else {
              res.role === Role.USER
                ? router.navigate(['/home'])
                : router.navigate([`${res.role}`]);
              return false;
            }
          }
          return true;
        }),
        catchError(() => {
          return of(true);
        })
      );
    }),
    catchError(() => {
      return of(true);
    })
  );
};
