import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user.model';
import { IPackage } from '../../interfaces/package.interface';
import { ICoupon } from '../../interfaces/coupon.interface';
import { FormGroup } from '@angular/forms';
import { IOffer } from '../../interfaces/offer.interface';

export const userLogin = createAction(
  '[Login Component] userLogin',
  props<{ email: string; password: string }>()
);
export const userLoginSuccess = createAction(
  '[Login Component] userLoginSuccess',
  props<{ user: IUser }>()
);

export const userLoginError = createAction(
  '[Login Component] userLoginError',
  props<{ error: string }>()
);

export const otpRender = createAction(
  '[Otp Component] otpRender',
  props<{ user: IUser }>()
);
export const otpRenderFromSignup = createAction(
  '[Otp User Component] otpRenderFromSignup',
  props<{ user: IUser }>()
);

export const userSignup = createAction(
  '[Signup Component] userSignup',
  props<{ userdata: IUser }>()
);

export const userSignupSuccess = createAction(
  '[Signup Component] userSignupSuccess',
  props<{ user: IUser }>()
);

export const userSignupError = createAction(
  '[Signup Component] userSignupError',
  props<{ error: string }>()
);

export const submitOtp = createAction(
  '[Otp Component] User submitOtp',
  props<{ otp: string; email: string | null | undefined }>()
);
export const submitOtpError = createAction(
  '[Otp Component] User submitOtpError',
  props<{ error: string }>()
);

export const resendOtp = createAction(
  '[Otp Component] resendOtpUser',
  props<{ email: string | null | undefined }>()
);
export const resendOtpSuccess = createAction(
  '[Otp Component] resendOtpSuccessUser',
  props<{ user: IUser }>()
);
export const resendOtpError = createAction(
  '[Otp Component] resendOtpErrorUser',
  props<{ error: string }>()
);

export const logout = createAction('[Logout] User');
export const logoutSuccess = createAction('[Logout Success] User');

export const showSinglePackage = createAction(
  '[showPackage] showSinglePackageComponent',
  props<{ id: string }>()
);
export const showSinglePackageSuccess = createAction(
  '[showPackageSuccess] showSinglePackageComponent',
  props<{ success: boolean; singlePackage: IPackage }>()
);
export const showSinglePackageError = createAction(
  '[showPackageError] showSinglePackageComponent',
  props<{ error: string }>()
);

export const bookingPage = createAction(
  '[booke package] BookingComponent',
  props<{ id: string }>()
);
export const bookingPageSuccess = createAction(
  '[bookingPageSuccess] BookingComponent',
  props<{ success: boolean; selectedPackage: IPackage }>()
);
export const bookingPageError = createAction(
  '[bookingPageSuccess] BookingComponent',
  props<{ error: string }>()
);

export const getAllCoupon = createAction(
  '[getAllCoupons] BookingCoumponent',
  props<{ packageId: string }>()
);
export const getAllCouponSuccess = createAction(
  '[getAllCoupons] BookingCoumponentSuccess',
  props<{ success: boolean; coupons: ICoupon[] }>()
);
export const getAllCouponError = createAction(
  '[getAllCoupons] BookingCoumponentError',
  props<{ error: string }>()
);

export const applyCoupon = createAction(
  '[apply coupon BookingCoumponent]',
  props<{ id: string; packagePrice: number; offer: IOffer | undefined }>()
);
export const cancelCoupon = createAction('[cancel coupon BookingCoumponent]');

export const initiatePayment = createAction(
  '[Payment] Initiate Payment',
  props<{ packageId: string | undefined; couponId: string }>()
);

export const initiatePaymentSuccess = createAction(
  '[Payment] Initiate Payment Success',
  props<{
    success: boolean;
    amount: number;
    currency: string;
    orderId: string;
    key_id: string;
  }>()
);

export const initiatePaymentFailure = createAction(
  '[Payment] Initiate Payment Failure',
  props<{ error: string }>()
);

export const verifyPayment = createAction(
  '[Payment] Verify Payment',
  props<{
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    packageId: string | undefined;
    agencyId: string;
    couponId: string;
    bookingData: FormGroup;
  }>()
);

export const verifyPaymentSuccess = createAction(
  '[Payment] Verify Payment Success',
  props<{ message: string }>()
);

export const verifyPaymentFailure = createAction(
  '[Payment] Verify Payment Failure',
  props<{ error: string }>()
);
