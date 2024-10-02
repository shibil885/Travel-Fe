import { Routes } from '@angular/router';
import { LoginComponent } from '../components/admin/login/login.component';
import { adminGuard } from '../auth/guards/admin/admin-guard.guard';
import { adminLoggedGuard } from '../auth/guards/admin/logged-admin.guard';

export const adminRouter: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent,
    canActivate: [adminLoggedGuard],
  },
  { path: 'admin', redirectTo: 'admin/home', pathMatch: 'full' },
  {
    path: 'admin/home',
    loadComponent: () =>
      import('../components/admin/home/home.component').then(
        (m) => m.HomeComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories',
    loadComponent: () =>
      import('../components/admin/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('../components/admin/users/users.component').then(
        (m) => m.UsersComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'admin/agencies',
    loadComponent: () =>
      import('../components/admin/agencies/agencies.component').then(
        (m) => m.AgenciesComponent
      ),
    canActivate: [adminGuard],
  },
];
