import { Routes } from '@angular/router';
import { LandingComponent } from '../components/user/landing/landing.component';
import { LoginComponent } from '../components/user/login/login.component';
import { HomeComponent } from '../components/user/home/home.component';
import { SignupComponent } from '../components/user/signup/signup.component';
import { PackagesComponent } from '../components/user/packages/packages.component';
import { authGuard } from '../auth/guards/auth.guard';
import { preventGuard } from '../auth/guards/logged.guard';
import { SinglePackageComponent } from '../components/user/packages/single-package/single-package.component';

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
  {
    path: 'package',
    component: SinglePackageComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
];
