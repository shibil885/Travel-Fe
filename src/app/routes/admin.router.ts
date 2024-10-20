// import { Routes } from '@angular/router';
// import { LoginComponent } from '../components/admin/login/login.component';
// import { adminGuard } from '../auth/guards/admin/admin-guard.guard';
// import { adminLoggedGuard } from '../auth/guards/admin/logged-admin.guard';

// export const adminRouter: Routes = [
//   {
//     path: 'admin/login',
//     component: LoginComponent,
//     canActivate: [adminLoggedGuard],
//   },
//   { path: 'admin', redirectTo: 'admin/home', pathMatch: 'full' },
//   {
//     path: 'admin/home',
//     loadComponent: () =>
//       import('../components/admin/home/home.component').then(
//         (m) => m.HomeComponent
//       ),
//     canActivate: [adminGuard],
//     data: { role: 'admin' },
//   },
//   {
//     path: 'admin/categories',
//     loadComponent: () =>
//       import('../components/admin/categories/categories.component').then(
//         (m) => m.CategoriesComponent
//       ),
//     canActivate: [adminGuard],
//   },
//   {
//     path: 'admin/users',
//     loadComponent: () =>
//       import('../components/admin/users/users.component').then(
//         (m) => m.UsersComponent
//       ),
//     canActivate: [adminGuard],
//   },
//   {
//     path: 'admin/agencies',
//     loadComponent: () =>
//       import('../components/admin/agencies/agencies.component').then(
//         (m) => m.AgenciesComponent
//       ),
//     canActivate: [adminGuard],
//   },
// ];
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
];
