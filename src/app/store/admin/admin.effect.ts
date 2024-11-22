import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as adminActions from '../admin/admin.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/service.service';

@Injectable()
export class AdminEffects {
  constructor(
    private _authService: AuthService,
    private _actions$: Actions,
    private _router: Router
  ) {}
  adminLogin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.adminLogin),
      switchMap((action) =>
        this._authService.login(action,'admin').pipe(
          map((data) =>
            adminActions.adminLoginsuccess({
              token: data.access_token,
              admin: data['admin'],
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
      this._actions$.pipe(
        ofType(adminActions.adminLoginsuccess),
        tap(() => {
          this._router.navigate(['/admin']);
        })
      ),
    { dispatch: false }
  );
  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.logout),
      switchMap(() =>
        this._authService.logout('admin').pipe(
          tap(() => {
            this._router.navigate(['/admin/login']);
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
