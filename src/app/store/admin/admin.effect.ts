import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as adminActions from '../admin/admin.action';
import { catchError, map, of, switchMap, tap } from "rxjs";

import { Router } from "@angular/router";
import { AdminService } from "../../shared/services/admin-service.service";

@Injectable()
export class AdminEffects {
    constructor(
        private adminService: AdminService,
        private action$: Actions,
        private router: Router
    ) {}
    adminLogin$ = createEffect(() => this.action$.pipe(
        ofType(adminActions.adminLogin),
        switchMap((action) => 
            this.adminService.login(action).pipe(
                map((data) => adminActions.adminLoginsuccess({ token: data.token})),
                catchError((error) => {
                    console.log(error);
                    return of(adminActions.adminLoginError({error: error.error.message}))
                })
            )
        )
    ))
    adminLoginSuccess$ = createEffect(() => this.action$.pipe(
        ofType(adminActions.adminLoginsuccess),
        tap((action) => {
            console.log('mm',action.token);
            localStorage.setItem('adminToken',action.token);
            this.router.navigate(['/admin']);
        })
    ),{dispatch:false})
}