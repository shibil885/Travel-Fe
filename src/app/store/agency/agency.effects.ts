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
    private actions$: Actions,
    private agencyService: AgencyService,
    private router: Router,
    private authService: AuthService,
  ) {}

  agencyLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agencyActions.agencyLogin),
      switchMap((data) =>
        this.authService.login(data,'agency').pipe(
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
      this.actions$.pipe(
        ofType(agencyActions.agencyLoginSuccess),
        tap((action) => {
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
              agency: response.agency,
            });
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
      this.actions$.pipe(
        ofType(agencyActions.agencySignupSuccess),
        tap((response) => {
          console.log();
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
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(agencyActions.logout),
        switchMap(() =>
          this.authService.logout('agency').pipe(
            tap(() => {
              this.router.navigate(['/agency/login'])
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
