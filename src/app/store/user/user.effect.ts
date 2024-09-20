import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthUserService } from "../../services/user/auth-user.service";
import * as userActions from '../user/user.action';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
@Injectable()
export class UserEffect {
    constructor( 
        private actions$ :Actions,
        private authService: AuthUserService,
        private router: Router,
    ) {}

    userLogin$ = createEffect(()=> this.actions$.pipe(
        ofType(userActions.userLogin),
        switchMap((action) => 
            this.authService.login(action).pipe(
                map((data) => userActions.userLoginSuccess({ token: data.token})),
                catchError((error) => {
                   return of(userActions.userLoginError({error:error.error.message}))
                })
            )
        )
    ))

    userLoginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.userLoginSuccess),
        tap((action) => {
            localStorage.setItem('token',action.token);
            this.router.navigate(['/']);
        })
    ), { dispatch: false    })
}