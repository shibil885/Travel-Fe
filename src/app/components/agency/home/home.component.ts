import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { AgencyService } from '../../../shared/services/agency.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { RecentBookingComponent } from './recent-booking/recent-booking.component';
import { NewCategoriesComponent } from './new-categories/new-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SideBarComponent,
    HeaderComponent,
    SearchComponent,
    StatsCardComponent,
    CommonModule,
    MatIconModule,
    RecentBookingComponent,
    NewCategoriesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isConfirmed!: boolean;
  constructor(private agencyService: AgencyService, private store: Store) {}
  ngOnInit(): void {
    this.agencyService.isConfirmed().subscribe((status) => {
      this.isConfirmed = status;
    });
  }
  onSearch(searchText: string) {
    console.log(searchText);
  }
}
