import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { AppState } from './store/app.store';
import { userRouter } from './routes/user.router';
import { adminRouter } from './routes/admin.router';
import { agencyRouter } from './routes/agency.router';
import { UserEffect } from './store/user/user.effect';
import { AdminEffects } from './store/admin/admin.effect';
import { AgencyEffect } from './store/agency/agency.effects';
import { errorInterceptorFn } from './interceptors/error.interceptor';

const allRoutes = [...userRouter, ...adminRouter, ...agencyRouter];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(allRoutes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptorFn])),
    provideStore(AppState),
    provideEffects(UserEffect, AdminEffects, AgencyEffect),
  ],
};
