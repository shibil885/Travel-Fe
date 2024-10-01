import { createAction, props } from '@ngrx/store';
import { IAgency } from '../../models/agency.model';

export const agencyLogin = createAction(
  '[Login Component] agencyLogin',
  props<{ email: string; password: string }>()
);
export const agencyLoginSuccess = createAction(
  '[Login Component] agencyLoginSuccess',
  props<{  agency: IAgency }>()
);
export const agencyLoginError = createAction(
  '[Login Component] agencyLoginError',
  props<{ error: string }>()
);

export const otpRender = createAction(
  '[Otp Component] otpRender',
  props<{ agency: IAgency }>()
);
export const otpRenderFromSignup = createAction(
  '[Otp Agency Component] otpRenderFromSignup',
  props<{ agency: IAgency }>()
);

export const agencySignup = createAction(
  '[Signup Component] agencySignup',
  props<{ agencyData: FormData }>()
);

export const agencySignupSuccess = createAction(
  '[Signup Component] agencySignupSuccess',
  props<{ agency: IAgency; }>()
);

export const agencySignupError = createAction(
  '[Signup Component] agencySignupError',
  props<{ error: string }>()
);

export const submitOtp = createAction(
  '[Otp Component] submitOtp',
  props<{ otp: string; email: string | null | undefined}>()
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
  props<{ agency: IAgency }>()
);
export const resendOtpError = createAction(
  '[Otp Component] resendOtpError',
  props<{ error: string }>()
);
