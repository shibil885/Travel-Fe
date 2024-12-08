// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { provideClientHydration } from '@angular/platform-browser';
// import { userRouter } from './routes/user.router';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideStore } from '@ngrx/store';
// import { AppState } from './store/app.store';
// import { provideEffects } from '@ngrx/effects';
// import { UserEffect } from './store/user/user.effect';
// import {
//   provideHttpClient,
//   withFetch,
//   withInterceptors,
// } from '@angular/common/http';
// import { adminRouter } from './routes/admin.router';
// import { AdminEffects } from './store/admin/admin.effect';
// import { agencyRouter } from './routes/agency.router';
// import { AgencyEffect } from './store/agency/agency.effects';
// import { errorInterceptorFn } from './interceptors/error.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(userRouter),
//     provideRouter(adminRouter),
//     provideRouter(agencyRouter),
//     provideClientHydration(),
//     provideAnimationsAsync(),
//     provideHttpClient(
//       withFetch(),
//       withInterceptors([errorInterceptorFn])
//     ),
//     provideStore(),
//     provideStore(AppState),
//     provideEffects(UserEffect),
//     provideEffects(AdminEffects),
//     provideEffects(AgencyEffect),
//   ],
// };

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
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
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const allRoutes = [...userRouter, ...adminRouter, ...agencyRouter];
const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: { withCredentials: true },
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(allRoutes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptorFn])),
    provideStore(AppState),
    provideEffects(UserEffect, AdminEffects, AgencyEffect),
    importProvidersFrom(SocketIoModule.forRoot(config)),
  ],
};
