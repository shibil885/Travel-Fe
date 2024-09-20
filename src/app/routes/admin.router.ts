import { Routes } from "@angular/router";
import { LoginComponent } from "../components/admin/login/login.component";

export const adminRouter: Routes = [
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin', redirectTo: 'admin/home', pathMatch: 'full' },
    { path: 'admin/home', loadComponent: () => import('../components/admin/home/home.component').then(m => m.HomeComponent) },
];
