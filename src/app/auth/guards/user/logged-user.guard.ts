import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserAuthService } from '../../services/user/user-auth.service';

export const authLoggedGuardFn: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();

  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      map((isValid: boolean) => {
        if (isValid) {
          router.navigate(['/home']); 
        }
        return true; 
      }),
      catchError(() => of(true)) 
    );
  }

  return of(true); // Allow access if no access token is present
};
