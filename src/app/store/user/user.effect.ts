import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../user/user.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userLogin),
      switchMap((data) =>
        this.userService.login(data).pipe(
          map((data) => {
            return userActions.userLoginSuccess({
              token: data.token,
              user: data.email,
            });
          }),
          catchError((error) => {
            console.log(error);
            if (error.status === 406) {
              return of(
                userActions.otpRender({
                  user: error.user,
                })
              );
            }
            return of(
              userActions.userLoginError({ error: error.error.message })
            );
          })
        )
      )
    )
  );

  userLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.userLoginSuccess),
        tap((action) => {
          localStorage.setItem('token', action.token);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  userSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userSignup),
      switchMap((data) =>
        this.userService.registerUser(data).pipe(
          map((response) => {
            return userActions.otpRenderFromSignup({
              user: response.user,
            });
          }),
          catchError((error) => {
            console.log('from catch error', error);
            return of(userActions.userSignupError(error.error.message));
          })
        )
      )
    )
  );

  submitOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.submitOtp),
      switchMap((data) =>
        this.userService.verifyOtp({ otp: data.otp, email: data.email }).pipe(
          map((response) => {
            return userActions.userSignupSuccess({
              user: response.user,
              token: response.token,
            });
          }),
          catchError((error) =>
            of(userActions.submitOtpError(error.error.message))
          )
        )
      )
    )
  );
  userSignupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.userSignupSuccess),
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );
  resendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.resendOtp),
      switchMap((data) =>
        this.userService.resendOtp({ email: data.email }).pipe(
          map((res) => {
            return userActions.resendOtpSuccess({ user: res.user });
          }),
          catchError((error) => {
            return of(
              userActions.resendOtpError({ error: error.error.message })
            );
          })
        )
      )
    )
  );
}
