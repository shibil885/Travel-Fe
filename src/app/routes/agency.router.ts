import { Routes } from '@angular/router';
import { SignupComponent } from '../components/agency/signup/signup.component';
import { LoginComponent } from '../components/agency/login/login.component';
import { PackagesComponent } from '../components/agency/packages/packages.component';
import { authGuard } from '../auth/guards/auth.guard';
import { preventGuard } from '../auth/guards/logged.guard';
import { BookingComponent } from '../components/agency/booking/booking.component';
import { OffersComponent } from '../components/agency/offers/offers.component';
import { OfferFormComponent } from '../components/agency/offers/offer-form/offer-form.component';
import { ViewOfferComponent } from '../components/agency/offers/view-offer/view-offer.component';
import { ChatComponent } from '../components/agency/chat/chat.component';
import { NotificationComponent } from '../components/agency/notification/notification.component';

export const agencyRouter: Routes = [
  { path: 'agency', redirectTo: 'agency/home', pathMatch: 'full' },
  {
    path: 'agency/home',
    loadComponent: () =>
      import('../components/agency/home/home.component').then(
        (m) => m.HomeComponent
      ),
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/signup',
    component: SignupComponent,
    canActivate: [preventGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/login',
    component: LoginComponent,
    canActivate: [preventGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/packages',
    component: PackagesComponent,
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/bookings',
    component: BookingComponent,
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/offers',
    component: OffersComponent,
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/addOffer',
    component: OfferFormComponent,
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/editOffer/:id',
    component: OfferFormComponent,
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/viewOffer/:id',
    component: ViewOfferComponent,
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/chat',
    component: ChatComponent,
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
  {
    path: 'agency/notifications',
    component: NotificationComponent,
    canActivate: [authGuard],
    data: { role: 'agency' },
  },
];
