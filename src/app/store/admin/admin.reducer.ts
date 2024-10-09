import { createReducer, on } from '@ngrx/store';
import * as adminActions from '../admin/admin.action';
import { error } from 'console';
export interface AdminState {
  loading: boolean;
  error: string | null;
  token: string;
}

export const initialAdminState: AdminState = {
  loading: false,
  error: null,
  token: '',
};

export const AdminReduce = createReducer(
  initialAdminState,
  on(adminActions.adminLoginsuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
    };
  }),
  on(adminActions.adminLoginError, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(adminActions.logoutSuccess,(state) => {
    return {
      ...state,
      user: null,
    }
  })
);
