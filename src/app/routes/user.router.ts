import { Routes } from "@angular/router";
import { LandingComponent } from "../components/user/landing/landing.component";
import { LoginComponent } from "../components/user/login/login.component";
import { HomeComponent } from "../components/user/home/home.component";

export const userRouter: Routes = [
    {path: '', component: LandingComponent },
    {path: 'login', component: LoginComponent },
    {path: 'home', component: HomeComponent}
,];