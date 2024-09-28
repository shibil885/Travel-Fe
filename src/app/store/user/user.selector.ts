import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector< UserState > ('user');


export const selectUser = createSelector(
    selectUserState,
    (state:UserState) => state.user
)

export const selectToken = createSelector(
    selectUserState,
    (state: UserState ) => state.token
)

export const selectError = createSelector(
    selectUserState,
    (state:UserState) => state.error
)

export const selectLoading = createSelector(
    selectUserState,
    (state: UserState) => state.loading
)
export const selectRenderOtpUser = createSelector(
    selectUserState,
    (state: UserState) => state.renderOtp
)
export const selectEmail = createSelector(
    selectUserState,
    (state: UserState) => state.user?.email
)