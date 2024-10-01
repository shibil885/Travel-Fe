import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AdminAuthService } from '../../services/admin/admin-auth.service';

export const adminAuthLoggedGuardFn: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
    console.log('admin_accessToken_ from looggggggg', accessToken);
  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      map((isValid: boolean) => {
        if (isValid) {
          router.navigate(['/admin/home']); 
          return false; 
        }
        return true;
      }),
      catchError(() => of(true)) 
    );
  }

  return of(true); 
};
