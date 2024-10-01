import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgencyState } from './agency.reducer';

export const selecAgencyState = createFeatureSelector<AgencyState>('agency');

export const selectAgency = createSelector(
  selecAgencyState,
  (state: AgencyState) => state.agency
);

export const selectError = createSelector(
  selecAgencyState,
  (state: AgencyState) => state.error
);

export const selectLoading = createSelector(
  selecAgencyState,
  (state: AgencyState) => state.loading
);
export const selectRenderOtpAgency = createSelector(
  selecAgencyState,
  (state: AgencyState) => state.renderOtp
);
export const selectEmail = createSelector(
  selecAgencyState,
  (state: AgencyState) => state.agency?.contact?.email
);
