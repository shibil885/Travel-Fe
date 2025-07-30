import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as agencyActions from './agency.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AgencyService } from '../../shared/services/agency.service';
import { AuthService } from '../../auth/service/service.service';

@Injectable()
export class AgencyEffect {
  constructor(
    private _actions$: Actions,
    private _agencyService: AgencyService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  agencyLogin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(agencyActions.agencyLogin),
      switchMap((data) =>
        this._authService.login(data, 'agency').pipe(
          map((data) => {
            return agencyActions.agencyLoginSuccess({
              agency: data['agency'],
            });
          }),
          catchError((error) => {
            if (error.status === 406) {
              return of(
                agencyActions.otpRender({
                  agency: error.error.agency.response,
                })
              );
            }
            return of(
              agencyActions.agencyLoginError({ error: error.error.message })
            );
          })
        )
      )
    )
  );

  agencyLoginSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(agencyActions.agencyLoginSuccess),
        tap((action) => {
          this._router.navigate(['/agency/home']);
        })
      ),
    { dispatch: false }
  );

  agencySignup$ = createEffect(() =>
    this._actions$.pipe(
      ofType(agencyActions.agencySignup),
      switchMap(({ agencyData: data }) =>
        this._agencyService.registerAgency(data).pipe(
          map((response) => {
            if (response.data) {
              return agencyActions.otpRenderFromSignup({
                agency: response?.data.agency,
              });
            }
            throw new Error('Please try again');
          }),
          catchError((error) => {
            return of(agencyActions.agencySignupError(error.error.message));
          })
        )
      )
    )
  );
  submitOtp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(agencyActions.submitOtp),
      switchMap((data) =>
        this._agencyService
          .verifyOtp({ otp: data.otp, email: data.email })
          .pipe(
            map((response) => {
              if (response.data) {
                return agencyActions.agencySignupSuccess({
                  agency: response.data,
                });
              }
              throw new Error('Failed to fetch agency');
            }),
            catchError((error) =>
              of(agencyActions.submitOtpError(error.message))
            )
          )
      )
    )
  );
  agencySignupSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(agencyActions.agencySignupSuccess),
        tap((response) => {
          console.log();
          this._router.navigate(['/agency/home']);
        })
      ),
    { dispatch: false }
  );
  resendOtp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(agencyActions.resendOtp),
      switchMap((data) =>
        this._agencyService.resendOtp({ email: data.email }).pipe(
          map((res) => {
            if (!res.data) throw new Error('Something went wrong')
            return agencyActions.resendOtpSuccess({ agency: res.data.agency });
          }),
          catchError((error) => {
            return of(
              agencyActions.resendOtpError({ error: error.error.message })
            );
          })
        )
      )
    )
  );
  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(agencyActions.logout),
        switchMap(() =>
          this._authService.logout('agency').pipe(
            tap(() => {
              this._router.navigate(['/agency/login']);
            }),
            catchError((error) => {
              console.error('Logout error: ', error);
              return of();
            })
          )
        )
      ),
    { dispatch: false }
  );
}
