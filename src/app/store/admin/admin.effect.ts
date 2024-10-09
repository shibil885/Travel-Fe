import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as adminActions from '../admin/admin.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AdminAuthService } from '../../auth/services/admin/admin-auth.service';

@Injectable()
export class AdminEffects {
  constructor(
    private authService: AdminAuthService,
    private actions$: Actions,
    private router: Router
  ) {}
  adminLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(adminActions.adminLogin),
      switchMap((action) =>
        this.authService.login(action).pipe(
          map((data) =>
            adminActions.adminLoginsuccess({
              token: data.token,
              admin: data.admin,
            })
          ),
          catchError((error) => {
            console.log(error);
            return of(
              adminActions.adminLoginError({ error: error.error.message })
            );
          })
        )
      )
    )
  );
  adminLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(adminActions.adminLoginsuccess),
        tap(() => {
          this.router.navigate(['/admin']);
        })
      ),
    { dispatch: false }
  );
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(adminActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          tap(() => {
            this.router.navigate(['/admin/login']);
          }),
          catchError((error) => {
            console.error('Logout error: ', error);
            return of();
          })
        )
      )
    ),{dispatch: false}
  );
}
