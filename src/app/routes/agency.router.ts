import { Routes } from "@angular/router";
import { SignupComponent } from "../components/agency/signup/signup.component";
import { LoginComponent } from "../components/agency/login/login.component";
import { PackagesComponent } from "../components/agency/packages/packages.component";

export const agencyRouter: Routes = [
    { path: 'agency', redirectTo:'agency/home',pathMatch: 'full'},
    { path: 'agency/home', loadComponent:() => import('../components/agency/home/home.component').then(m => m.HomeComponent)},
    { path: 'agency/signup', component:SignupComponent},
    { path: 'agency/login', component:LoginComponent},
    { path: 'agency/packages', component: PackagesComponent}

]