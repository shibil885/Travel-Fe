import { Routes } from '@angular/router';
import { SignupComponent } from '../components/agency/signup/signup.component';
import { LoginComponent } from '../components/agency/login/login.component';
import { PackagesComponent } from '../components/agency/packages/packages.component';
import { agencyAuthLoggedGuardFn } from '../auth/guards/agency/logged-agency.guard';
import { agencyAuthGuardFn } from '../auth/guards/agency/agency-guard.guard';

export const agencyRouter: Routes = [
  { path: 'agency', redirectTo: 'agency/home', pathMatch: 'full' },
  {
    path: 'agency/home',
    loadComponent: () =>
      import('../components/agency/home/home.component').then(
        (m) => m.HomeComponent
      ),
    canActivate: [agencyAuthGuardFn],
  },
  {
    path: 'agency/signup',
    component: SignupComponent,
    canActivate: [agencyAuthLoggedGuardFn],
  },
  {
    path: 'agency/login',
    component: LoginComponent,
    canActivate: [agencyAuthLoggedGuardFn],
  },
  {
    path: 'agency/packages',
    component: PackagesComponent,
    canActivate: [agencyAuthGuardFn],
  },
];
