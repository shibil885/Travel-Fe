import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, SearchComponent, CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {}
