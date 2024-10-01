import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AgencyAuthService } from '../../services/agency/agency-auth.service';

export const agencyAuthLoggedGuardFn: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AgencyAuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
    console.log('accessToken--------:', accessToken);
  if (accessToken) {
    return authService.validateToken(accessToken).pipe(
      map((isValid: boolean) => {
        if (isValid) {
          router.navigate(['/agency/home']); 
          return false; 
        }
        return true;
      }),
      catchError(() => of(true)) 
    );
  }

  return of(true); 
};
