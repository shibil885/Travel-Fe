import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user.model';

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
  props<{ userdata: any }>()
);

export const userSignupSuccess = createAction(
  '[Signup Component] userSignupSuccess',
  props<{ user: IUser;  }>()
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
  '[Otp Component] submitOtpError',
  props<{ error: string }>()
);

export const resendOtp = createAction(
  '[Otp Component] resendOtp',
  props<{ email: string | null | undefined}>()
);
export const resendOtpSuccess = createAction(
  '[Otp Component] resendOtpSuccess',
  props<{ user: IUser }>()
);
export const resendOtpError = createAction(
  '[Otp Component] resendOtpError',
  props<{ error: string }>()
);

export const logout = createAction('[Logout] User')
export const logoutSuccess = createAction('[Logout Success] User')