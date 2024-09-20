import { createAction, props } from "@ngrx/store";


export const userLogin = createAction('[Login Component] userLogin', props<{email:string, password: string}>())
export const userLoginSuccess = createAction('[Login Component] userLoginSuccess', props<{ token: string }>())
export const userLoginError = createAction('[Login Component] userLoginError', props<{ error: string }>())