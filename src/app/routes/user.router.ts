// import { Routes } from '@angular/router';
// import { LandingComponent } from '../components/user/landing/landing.component';
// import { LoginComponent } from '../components/user/login/login.component';
// import { HomeComponent } from '../components/user/home/home.component';
// import { SignupComponent } from '../components/user/signup/signup.component';
// import { userGuard } from '../auth/guards/user/user-guard.guard';
// import { userLoggedGuard } from '../auth/guards/user/logged-user.guard';
// import { PackagesComponent } from '../components/user/packages/packages.component';

// export const userRouter: Routes = [
//   {
//     path: '', component: LandingComponent,
//      canActivate: [userLoggedGuard]
//     },
//   {
//     path: 'login',
//     component: LoginComponent,
//     canActivate: [userLoggedGuard],
//   },
//   {
//     path: 'signup',
//     component: SignupComponent,
//     canActivate: [userLoggedGuard],
//   },
//   {
//     path: 'home',
//     component: HomeComponent,
//     canActivate: [userGuard],
//   },
//   {
//     path: 'packages',
//     component: PackagesComponent,
//     canActivate: [userGuard],
//   },
// ];

import { Routes } from '@angular/router';
import { LandingComponent } from '../components/user/landing/landing.component';
import { LoginComponent } from '../components/user/login/login.component';
import { HomeComponent } from '../components/user/home/home.component';
import { SignupComponent } from '../components/user/signup/signup.component';
import { PackagesComponent } from '../components/user/packages/packages.component';
import { authGuard } from '../auth/guards/auth.guard';
import { preventGuard } from '../auth/guards/logged.guard';

export const userRouter: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [preventGuard],
    data: { role: 'user' },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [preventGuard],
    data: { role: 'user' },
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [preventGuard],
    data: { role: 'user' },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'packages',
    component: PackagesComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
];
