import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.action';
import { IUser } from '../../models/user.model';

export interface UserState {
  user: IUser | null;
  token: string;
  error: string;
  loading: boolean;
  renderOtp: boolean;
}

export const initialUserState: UserState = {
  user: null,
  token: '',
  error: '',
  renderOtp: false,
  loading: false,
};

export const UserReducer = createReducer(
  initialUserState,
  on(userActions.userLoginSuccess, (state, { token, user }) => {
    return {
      ...state,
      token: token,
      user: user,
      loading: false,
    };
  }),
  on(userActions.userLoginError, (state, error) => {
    return {
      ...state,
      error: error.error,
    };
  }),
  on(userActions.otpRender, (state, error ) => {
    return {
      ...state,
      renderOtp: true,
      user: error.user,
    };
  }),
  on(userActions.otpRenderFromSignup, (state, {user} ) => {
    return {
      ...state,
      renderOtp: true,
      user: user,
    };
  }),
  on(userActions.userSignupSuccess, (state, { user, token }) => {
    return {
      ...state,
      token: token,
      user: user,
    };
  }),
  on(userActions.userSignupError, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(userActions.submitOtpError, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(userActions.resendOtpSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      renderOtp: true,
    };
  }),
  on(userActions.resendOtpError, (state, { error }) => {
    return {
      ...state,
      error: error,
      renderOtp: true,
    };
  })
);
