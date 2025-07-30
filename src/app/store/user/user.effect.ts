import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../user/user.action';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../auth/service/service.service';
import { CouponService } from '../../shared/services/coupon.service';
import { BookingService } from '../../shared/services/booking.service';

@Injectable()
export class UserEffect {
  constructor(
    private _actions$: Actions,
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private _couponService: CouponService,
    private _bookingService: BookingService
  ) {}

  userLogin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.userLogin),
      switchMap((action) =>
        this._authService.login(action, 'user').pipe(
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
      this._actions$.pipe(
        ofType(userActions.userLoginSuccess),
        tap(() => {
          console.log('entered to home');
          this._router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  userSignup$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.userSignup),
      switchMap(({ userdata }) => {
        return this._userService.registerUser(userdata).pipe(
          map((response) => {
            if (!response.data) throw new Error('Something went wrong');
            return userActions.otpRenderFromSignup({
              user: response.data.user,
            });
          }),
          catchError((error) => {
            return of(userActions.userSignupError(error.error.message));
          })
        );
      })
    )
  );

  submitOtp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.submitOtp),
      switchMap((data) => {
        console.log('submitted data from effect', data);
        return this._userService
          .verifyOtpUser({ otp: data.otp, email: data.email })
          .pipe(
            map((response) => {
              if (!response.data) throw new Error('Something went wrong');
              return userActions.userSignupSuccess({
                user: response.data.user,
              });
            }),
            catchError((error) =>
              of(userActions.submitOtpError(error.error.message))
            )
          );
      })
    )
  );
  userSignupSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.userSignupSuccess),
        tap(() => {
          this._router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );
  resendOtp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.resendOtp),
      switchMap((data) => {
        return this._userService.resendOtp({ email: data.email }).pipe(
          map((res) => {
            if (!res.data) {
              throw new Error('Something went wrong');
            }
            return userActions.resendOtpSuccess({ user: res.data.user });
          }),
          catchError((error) => {
            return of(
              userActions.resendOtpError({ error: error.error.message })
            );
          })
        );
      })
    )
  );
  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.logout),
        switchMap(() =>
          this._authService.logout('user').pipe(
            tap(() => {
              console.log('hit the tap');
              this._router.navigate(['/login']);
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
    this._actions$.pipe(
      ofType(userActions.showSinglePackage),
      switchMap((data) =>
        this._userService.getSinglePackage(data.id).pipe(
          map((response) => {
            if (response.data && response.success) {
              userActions.showSinglePackageSuccess({
                success: response.success,
                singlePackage: response.data.package,
              });
            }
            throw new Error('Something went wrong');
          })
        )
      ),
      catchError((error) =>
        of(userActions.showSinglePackageError({ error: error }))
      )
    )
  );
  showSinglePackageSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.showSinglePackageSuccess),
        tap(() => {
          this._router.navigate(['/package']);
        })
      ),
    { dispatch: false }
  );
  bookingPage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.bookingPage),
      switchMap((data) =>
        this._userService.getSinglePackage(data.id).pipe(
          map((response) => {
            if (response.success && response.data) {
              userActions.bookingPageSuccess({
                success: response.success,
                selectedPackage: response.data.package,
              });
            }
            throw new Error('Something went wrong');
          })
        )
      ),
      catchError((error) => of(userActions.bookingPageError({ error: error })))
    )
  );
  bookingPageSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.bookingPageSuccess),
        tap(() => {
          this._router.navigate(['/booking']);
        })
      ),
    { dispatch: false }
  );
  getAllCoupons$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.getAllCoupon),
      switchMap((data) =>
        this._couponService.getCouponsToUser(data.packageId).pipe(
          map((response) => {
            if (response.data && response.success) {
              return userActions.getAllCouponSuccess({
                success: response.success,
                coupons: response.data?.coupons,
              });
            }
            throw new Error('Something went wrong');
          })
        )
      ),
      catchError((error) => of(userActions.bookingPageError({ error: error })))
    )
  );
  getAllCouponSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.getAllCouponSuccess),
        tap(() => {
          this._router.navigate(['/booking']);
        })
      ),
    { dispatch: false }
  );

  initiatePayment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.initiatePayment),
      switchMap((data) =>
        this._bookingService.createPayment(data.packageId, data.couponId).pipe(
          map((response) =>
            userActions.initiatePaymentSuccess({
              success: response.success,
              amount: response.amount,
              currency: response.currency,
              orderId: response.id,
              key_id: 'rzp_test_ihsNz6lracNIu3',
            })
          )
        )
      ),
      catchError((error) =>
        of(userActions.initiatePaymentFailure({ error: error.message }))
      )
    )
  );

  verifyPayment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.verifyPayment),
      switchMap((data) =>
        this._bookingService
          .verifyPayment(
            data.razorpay_order_id,
            data.razorpay_payment_id,
            data.razorpay_signature,
            data.packageId,
            data.agencyId,
            data.couponId,
            data.bookingData
          )
          .pipe(
            map((res) => {
              return userActions.verifyPaymentSuccess({
                message: res.message,
              });
            })
          )
      ),
      catchError((error) =>
        of(userActions.verifyPaymentFailure({ error: error.message }))
      )
    )
  );

  verifyPaymentSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.verifyPaymentSuccess),
        tap(() => {
          console.log('payment success listern from effect');
          console.log('log from ng zone');
          this._router.navigate(['/packages']);
        })
      ),
    { dispatch: false }
  );
}
