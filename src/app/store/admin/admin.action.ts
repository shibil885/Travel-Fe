import { createAction, props } from '@ngrx/store';
import { IAdmin } from '../../models/admin.interface';

export const adminLogin = createAction(
  '[Admin Component ] adminLogin',
  props<{ email: string; password: string }>()
);
export const adminLoginsuccess = createAction(
  '[Admin Component] adminloginSuccess',
  props<{ token: string; admin: IAdmin }>()
);
export const adminLoginError = createAction(
  '[Admin Component] adminLoginError',
  props<{ error: string }>()
);

export const logout = createAction('[Logout] Admin');
export const logoutSuccess = createAction('[Logout Success] Admin');
