import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.reducer";

export const selectAdminState = createFeatureSelector< AdminState >('admin')

export const selectLoading = createSelector(
    selectAdminState,
    (state: AdminState) => state.loading
)

export const selectToken = createSelector(
    selectAdminState,
    (state: AdminState) => state.token
)

export const selectError = createSelector(
    selectAdminState,
    (state:AdminState) => state.error
)
