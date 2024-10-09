import { createReducer, on } from '@ngrx/store';
import * as agencyActions from './agency.action';
import { IAgency } from '../../models/agency.model';

export interface AgencyState {
  agency: IAgency | null;
  error: string;
  loading: boolean;
  renderOtp: boolean;
}

export const initialAgencyState: AgencyState = {
  agency: null,
  error: '',
  renderOtp: false,
  loading: false,
};

export const AgencyReducer = createReducer(
  initialAgencyState,
  on(agencyActions.agencyLoginSuccess, (state, {agency }) => {
    return {
      ...state,
      agency: agency,
      loading: false,
    };
  }),
  on(agencyActions.agencyLoginError, (state, error) => {
    return {
      ...state,
      error: error.error,
    };
  }),
  on(agencyActions.otpRender, (state, { agency }) => {
    return {
      ...state,
      renderOtp: true,
      agency: agency,
    };
  }),
  on(agencyActions.otpRenderFromSignup, (state, { agency }) => {
    return {
      ...state,
      agency: agency,
      renderOtp: true,
    };
  }),
  on(agencyActions.agencySignupSuccess, (state, { agency }) => {
    return {
      ...state,
      agency: agency,
    };
  }),
  on(agencyActions.agencySignupError, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(agencyActions.submitOtpError, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(agencyActions.resendOtpSuccess, (state, { agency }) => {
    return {
      ...state,
      agency: agency,
      renderOtp: true,
    };
  }),
  on(agencyActions.resendOtpError, (state, { error }) => {
    return {
      ...state,
      error: error,
      renderOtp: true,
    };
  }),
  on(agencyActions.logoutSuccess,(state) => {
    return {
      ...state,
      agency: null,
    }
  })
);
