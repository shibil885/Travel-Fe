import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../models/user.model";
import * as userActions from './user.action';

export interface UserState {
    user: IUser | null;
    token: string;
    error: string;
    loading: boolean
}

export const initialUserState: UserState = {
    user: null,
    token: '',
    error: '',
    loading: false
}

export const UserReducer = createReducer(
    initialUserState,
    on(userActions.userLoginSuccess,(state, { token } ) => {
        return {
            ...state,
            token:token,
            loading:false
        }
    }),
    on(userActions.userLoginError, ( state, error ) => {
        return {
            ...state,
            error:error.error
        }
    })
)   