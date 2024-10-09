import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { userRouter } from './routes/user.router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { AppState } from './store/app.store';
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './store/user/user.effect';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { adminRouter } from './routes/admin.router';
import { AdminEffects } from './store/admin/admin.effect';
import { agencyRouter } from './routes/agency.router';
import { AgencyEffect } from './store/agency/agency.effects';
import { errorInterceptorFn } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(userRouter),
    provideRouter(adminRouter),
    provideRouter(agencyRouter),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptorFn])
    ),
    provideStore(),
    provideStore(AppState),
    provideEffects(UserEffect),
    provideEffects(AdminEffects),
    provideEffects(AgencyEffect),
  ],
};
