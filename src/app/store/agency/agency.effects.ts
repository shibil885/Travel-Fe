import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as agencyActions from './agency.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AgencyService } from '../../shared/services/agency.service';

@Injectable()
export class AgencyEffect {
  constructor(
    private actions$: Actions,
    private agencyService: AgencyService,
    private router: Router
  ) {}

  agencyLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.agencyLogin),
      switchMap((data) =>
        this.agencyService.login(data).pipe(
          map((data) => {
            return agencyActions.agencyLoginSuccess({
              token: data.token,
              agency: data.agency,
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
      this.actions$.pipe(
        ofType(agencyActions.agencyLoginSuccess),
        tap((action) => {
          localStorage.setItem('agencytoken', action.token);
          this.router.navigate(['/agency/home']);
        })
      ),
    { dispatch: false }
  );

  agencySignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.agencySignup),
      switchMap(({ agencyData: data }) =>
        this.agencyService.registerAgency(data).pipe(
          map((response) => {
            return agencyActions.otpRenderFromSignup({
              agency: response?.agency,
            });
          }),
          catchError((error) => {
            console.log('from catch error', error);
            return of(agencyActions.agencySignupError(error.error.message));
          })
        )
      )
    )
  );
  submitOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.submitOtp),
      switchMap((data) =>
        this.agencyService.verifyOtp({ otp: data.otp, email: data.email }).pipe(
          map((response) => {
            return agencyActions.agencySignupSuccess({
              agency: response.email,
              token: response.token,
            });
          }),
          catchError((error) =>
            of(agencyActions.submitOtpError(error.error.message))
          )
        )
      )
    )
  );
  agencySignupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(agencyActions.agencySignupSuccess),
        tap((response) => {
          localStorage.setItem('agencytoken', response.token);
          this.router.navigate(['/agency/home']);
        })
      ),
    { dispatch: false }
  );
  resendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.resendOtp),
      switchMap((data) =>
        this.agencyService.resendOtp({ email: data.email }).pipe(
          map((res) => {
            return agencyActions.resendOtpSuccess({ agency: res.email });
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
}
