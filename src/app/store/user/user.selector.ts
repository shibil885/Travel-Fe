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
export const selectSuccess = createSelector(
  selectUserState,
  (state: UserState) => state.success
);
export const selectPackage = createSelector(
  selectUserState,
  (state: UserState) => state.package
);
export const selectCoupons = createSelector(
  selectUserState,
  (state: UserState) => state.coupons
);
export const selectPrice = createSelector(
  selectUserState,
  (state: UserState) => state.price
);
export const selectAmount = createSelector(
  selectUserState,
  (state: UserState) => state.amount
);
export const selectCurrency = createSelector(
  selectUserState,
  (state: UserState) => state.currency
);
export const selectOrderId = createSelector(
  selectUserState,
  (state: UserState) => state.orderId
);
export const selectMessage = createSelector(
  selectUserState,
  (state: UserState) => state.message
);
export const selectKey_id = createSelector(
  selectUserState,
  (state: UserState) => state.key_id
);
