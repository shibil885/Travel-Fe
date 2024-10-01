import { Routes } from "@angular/router";
import { LoginComponent } from "../components/admin/login/login.component";
import { adminAuthLoggedGuardFn } from "../auth/guards/admin/logged-admin.guard";
import { adminAuthGuardFn } from "../auth/guards/admin/admin-guard.guard";

export const adminRouter: Routes = [
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin', redirectTo: 'admin/home', pathMatch: 'full' },
    { path: 'admin/home', loadComponent: () => import('../components/admin/home/home.component').then(m => m.HomeComponent) , },
    { path: 'admin/categories', loadComponent: () => import('../components/admin/categories/categories.component').then(m => m.CategoriesComponent ), },
    { path: 'admin/users', loadComponent: () => import('../components/admin/users/users.component').then(m => m.UsersComponent ), },
    { path: 'admin/agencies', loadComponent: () => import('../components/admin/agencies/agencies.component').then(m => m.AgenciesComponent ), }
];
