import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { AuthService } from '../service/service.service';
import { Role } from '../../enum/role.enum';
import { LoadingService } from '../../shared/services/loading.service';

export const preventGuard: CanActivateFn = (route): Observable<boolean> => {
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);
  const router = inject(Router);
  const role: Role = route.data['role'];
  loadingService.showLoading();

  return authService.validateToken().pipe(
    switchMap((res) => {
      if (res.valid) {
        if (res.role === role) {
          role === Role.USER
            ? router.navigate([`/home`])
            : router.navigate([`/${res.role}`]);
          loadingService.hideLoading();
          return of(false);
        } else {
          loadingService.hideLoading();
          res.role === Role.USER
            ? router.navigate(['/home'])
            : router.navigate([`${res.role}`]);
          return of(false);
        }
      }
      return authService.refreshToken().pipe(
        map((refreshRes) => {
          if (refreshRes.isRefreshed) {
            loadingService.hideLoading();
            if (refreshRes.role === role) {
              role === Role.USER
                ? router.navigate([`/home`])
                : router.navigate([`/${res.role}`]);
              return false;
            } else {
              loadingService.hideLoading();
              res.role === Role.USER
                ? router.navigate(['/home'])
                : router.navigate([`${res.role}`]);
              return false;
            }
          }
          return true;
        }),
        catchError(() => {
          loadingService.hideLoading();
          return of(true);
        })
      );
    }),
    catchError(() => {
      loadingService.hideLoading();
      return of(true);
    })
  );
};
