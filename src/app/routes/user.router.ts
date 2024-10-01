import { Routes } from '@angular/router';
import { LandingComponent } from '../components/user/landing/landing.component';
import { LoginComponent } from '../components/user/login/login.component';
import { HomeComponent } from '../components/user/home/home.component';
import { SignupComponent } from '../components/user/signup/signup.component';
import { authGuardFn } from '../auth/guards/user/user-guard.guard';
import { authLoggedGuardFn } from '../auth/guards/user/logged-user.guard';

export const userRouter: Routes = [
  { path: '', component: LandingComponent, canActivate: [authLoggedGuardFn] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authLoggedGuardFn],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [authLoggedGuardFn],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuardFn],
  },
];
