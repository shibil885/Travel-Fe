import { createAction, props } from "@ngrx/store";

export const adminLogin = createAction('[Admin Component ] adminLogin',props<{ email: string, password: string }>());
export const adminLoginsuccess = createAction('[Admin Component] adminloginSuccess',props<{ token: string}>());
export const adminLoginError = createAction('[Admin Component] adminLoginError',props<{ error: string}>());
