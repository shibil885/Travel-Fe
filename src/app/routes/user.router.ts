import { Routes } from '@angular/router';
import { LandingComponent } from '../components/user/landing/landing.component';
import { LoginComponent } from '../components/user/login/login.component';
import { HomeComponent } from '../components/user/home/home.component';
import { SignupComponent } from '../components/user/signup/signup.component';
import { userGuard } from '../auth/guards/user/user-guard.guard';
import { userLoggedGuard } from '../auth/guards/user/logged-user.guard';

export const userRouter: Routes = [
  { path: '', component: LandingComponent, canActivate: [userLoggedGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [userLoggedGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [userLoggedGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [userGuard],
  },
];
