import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../user/user.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../auth/service/service.service';
import { error } from 'console';
import { CouponService } from '../../shared/services/coupon.service';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private couponService: CouponService
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userLogin),
      switchMap((action) =>
        this.authService.login(action, 'user').pipe(
          map((response) => {
            return userActions.userLoginSuccess({
              user: response['user'],
            });
          }),
          catchError((error) => {
            console.error('Error during user login effect: ', error);
            if (error.status === 406) {
              return of(
                userActions.otpRender({
                  user: error.error.user,
                })
              );
            }
            return of(userActions.userLoginError({ error: error.message }));
          })
        )
      )
    )
  );

  userLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.userLoginSuccess),
        tap(() => {
          console.log('entered to home');
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
        this.userService
          .verifyOtpUser({ otp: data.otp, email: data.email })
          .pipe(
            map((response) => {
              return userActions.userSignupSuccess({
                user: response.user,
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
        tap(() => {
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
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.logout),
        switchMap(() =>
          this.authService.logout('user').pipe(
            tap(() => {
              this.router.navigate(['/login']);
            }),
            catchError((error) => {
              console.error('Logout error: ', error);
              return of(true);
            })
          )
        )
      ),
    { dispatch: false }
  );

  showSinglePaackage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.showSinglePackage),
      switchMap((data) =>
        this.userService.getSinglePackage(data.id).pipe(
          map((response) =>
            userActions.showSinglePackageSuccess({
              success: response.success,
              singlePackage: response.package,
            })
          )
        )
      ),
      catchError((error) =>
        of(userActions.showSinglePackageError({ error: error }))
      )
    )
  );
  showSinglePackageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.showSinglePackageSuccess),
        tap(() => {
          this.router.navigate(['/package']);
        })
      ),
    { dispatch: false }
  );
  bookingPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.bookingPage),
      switchMap((data) =>
        this.userService.getSinglePackage(data.id).pipe(
          map((response) =>
            userActions.bookingPageSuccess({
              success: response.success,
              selectedPackage: response.package,
            })
          )
        )
      ),
      catchError((error) => of(userActions.bookingPageError({ error: error })))
    )
  );
  bookingPageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.bookingPageSuccess),
        tap(() => {
          this.router.navigate(['/booking']);
        })
      ),
    { dispatch: false }
  );
  getAllCoupons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllCoupon),
      switchMap((data) =>
        this.couponService.getCouponsToUser(data.packageId).pipe(
          map((response) =>
            userActions.getAllCouponSuccess({
              success: response.success,
              coupons: response.coupons,
            })
          )
        )
      ),
      catchError((error) => of(userActions.bookingPageError({ error: error })))
    )
  );
  getAllCouponSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.getAllCouponSuccess),
        tap(() => {
          this.router.navigate(['/booking']);
        })
      ),
    { dispatch: false }
  );
}
