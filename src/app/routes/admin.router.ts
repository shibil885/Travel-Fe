import { Routes } from '@angular/router';
import { LoginComponent } from '../components/admin/login/login.component';
import { authGuard } from '../auth/guards/auth.guard';
import { preventGuard } from '../auth/guards/logged.guard';

export const adminRouter: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent,
    canActivate: [preventGuard],
    data: { role: 'admin' },
  },
  { path: 'admin', redirectTo: 'admin/home', pathMatch: 'full' },
  {
    path: 'admin/home',
    loadComponent: () =>
      import('../components/admin/home/home.component').then(
        (m) => m.HomeComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/categories',
    loadComponent: () =>
      import('../components/admin/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('../components/admin/users/users.component').then(
        (m) => m.UsersComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/agencies',
    loadComponent: () =>
      import('../components/admin/agencies/agencies.component').then(
        (m) => m.AgenciesComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/notification',
    loadComponent: () =>
      import('../components/admin/notification/notification.component').then(
        (m) => m.NotificationComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/coupon',
    loadComponent: () =>
      import('../components/admin/coupon/coupon.component').then(
        (m) => m.CouponComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/bookings',
    loadComponent: () =>
      import('../components/admin/bookings/bookings.component').then(
        (m) => m.BookingsComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/bookingsByAgency/:id',
    loadComponent: () =>
      import(
        '../components/admin/bookings/single-agency/single-agency.component'
      ).then((m) => m.SingleAgencyComponent),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/wallet',
    loadComponent: () =>
      import('../components/admin/wallet/wallet.component').then(
        (m) => m.WalletComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/report',
    loadComponent: () =>
      import('../components/admin/report/report.component').then(
        (m) => m.ReportComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
];
