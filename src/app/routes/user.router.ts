import { Routes } from '@angular/router';
import { LandingComponent } from '../components/user/landing/landing.component';
import { LoginComponent } from '../components/user/login/login.component';
import { HomeComponent } from '../components/user/home/home.component';
import { SignupComponent } from '../components/user/signup/signup.component';
import { PackagesComponent } from '../components/user/packages/packages.component';
import { authGuard } from '../auth/guards/auth.guard';
import { preventGuard } from '../auth/guards/logged.guard';
import { SinglePackageComponent } from '../components/user/packages/single-package/single-package.component';
import { BookingComponent } from '../components/user/booking/booking.component';
import { BookedComponent } from '../components/user/booked/booked.component';
import { SingleBookedComponent } from '../components/user/booked/single-booked/single-booked.component';
import { WalletComponent } from '../components/user/wallet/wallet.component';
import { ProfileComponent } from '../components/user/profile/profile.component';
import { PostsComponent } from '../components/user/posts/posts.component';
import { UploadsComponent } from '../components/user/uploads/uploads.component';
import { ForgotPasswordComponent } from '../components/user/forgot-password/forgot-password.component';
import { ForgotPasswordFormComponent } from '../components/user/forgot-password/forgot-password-form/forgot-password-form.component';

export const userRouter: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [preventGuard],
    data: { role: 'user' },
  },
  { path: 'user/home', redirectTo: 'home', pathMatch: 'full' },
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
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'booked',
    component: BookedComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'singlebooked',
    component: SingleBookedComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'uploads',
    component: UploadsComponent,
    canActivate: [authGuard],
    data: { role: 'user' },
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    canActivate: [preventGuard],
    data: { role: 'user' },
  },
  {
    path: 'resetPassword/:id',
    component: ForgotPasswordFormComponent,
    canActivate: [preventGuard],
    data: { role: 'user' },
  },
];
