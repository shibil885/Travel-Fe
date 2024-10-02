import { Routes } from '@angular/router';
import { SignupComponent } from '../components/agency/signup/signup.component';
import { LoginComponent } from '../components/agency/login/login.component';
import { PackagesComponent } from '../components/agency/packages/packages.component';
import { agencyGuard } from '../auth/guards/agency/agency-guard.guard';
import { agencyLoggedGuard } from '../auth/guards/agency/logged-agency.guard';

export const agencyRouter: Routes = [
  { path: 'agency', redirectTo: 'agency/home', pathMatch: 'full' },
  {
    path: 'agency/home',
    loadComponent: () =>
      import('../components/agency/home/home.component').then(
        (m) => m.HomeComponent
      ),
    canActivate: [agencyGuard],
  },
  {
    path: 'agency/signup',
    component: SignupComponent,
    canActivate: [agencyLoggedGuard],
  },
  {
    path: 'agency/login',
    component: LoginComponent,
    canActivate: [agencyLoggedGuard],
  },
  {
    path: 'agency/packages',
    component: PackagesComponent,
    canActivate: [agencyGuard],
  },
];
