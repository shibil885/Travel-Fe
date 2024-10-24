import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);
export const selectRenderOtpUser = createSelector(
  selectUserState,
  (state: UserState) => state.renderOtp
);
export const selectEmail = createSelector(
  selectUserState,
  (state: UserState) => state.user?.email
);
export const selectSucess = createSelector(
  selectUserState,
  (state: UserState) => state.success
);
export const selectPackage = createSelector(
  selectUserState,
  (state: UserState) => state.package
);
