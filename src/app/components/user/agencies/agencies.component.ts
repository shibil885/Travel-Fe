// travel-agency-list.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgencyCardComponent } from './agency-card/agency-card.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { AgencyFilterComponent } from './agency-filter/agency-filter.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ChatService } from '../../../shared/services/chat/chat.service';
import { AgencyService } from '../../../shared/services/agency.service';
import { IAgency } from '../../../models/agency.model';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';

@Component({
  selector: 'app-travel-agency-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AgencyCardComponent,
    AgencyFilterComponent,
    SearchComponent,
    PaginationComponent,
    HeaderSidebarComponent,
  ],
  template: `
    <app-header-sidebar></app-header-sidebar>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        Agencies
      </h1>

      <!-- Search and Filter Section -->
      <app-search
        (searchUsersEvent)="handleSearch($event)"
        class="w-full md:w-1/3"
      >
      </app-search>
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div class="flex items-center">
            <label for="sortBy" class="mr-2 text-gray-700">Sort by:</label>
            <select
              id="sortBy"
              [(ngModel)]="sortBy"
              (change)="handleSortChange()"
              class="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="location">Location</option>
            </select>
          </div>

          <button
            (click)="isFilterOpen = !isFilterOpen"
            class="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd"
              />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <!-- Filters Panel (expandable) -->
      <app-agency-filter
        *ngIf="isFilterOpen"
        [minRating]="filterMinRating()"
        [locations]="availableLocations()"
        [selectedLocations]="filterLocations()"
        (filterChange)="handleFilterChange($event)"
        class="mb-6"
      >
      </app-agency-filter>

      <!-- No Results Message -->
      <div
        *ngIf="!isLoading() && filteredAgencies().length === 0"
        class="text-center py-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-xl font-medium text-gray-700 mb-2">
          No agencies found
        </h3>
        <p class="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>

      <!-- Agency Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <app-agency-card
          *ngFor="let agency of paginatedAgencies()"
          [agency]="agency"
          (startChat)="onStartChat($event)"
        >
        </app-agency-card>
      </div>

      <!-- Pagination -->
      <app-pagination
        *ngIf="filteredAgencies().length > 0"
        [totalItems]="filteredAgencies().length"
        [itemsPerPage]="itemsPerPage()"
        [currentPage]="currentPage()"
        (pageChange)="onPageChange($event)"
      >
      </app-pagination>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AgenciesComponent implements OnInit {
  private agencyService = inject(AgencyService);
  private chatService = inject(ChatService);

  // Signals for reactive state management
  agencies = signal<IAgency[]>([]);
  filteredAgencies = signal<IAgency[]>([]);
  paginatedAgencies = signal<IAgency[]>([]);
  availableLocations = signal<string[]>([]);

  // Filters and sorting
  searchTerm = signal('');
  sortBy = signal('name');
  filterMinRating = signal(0);
  filterLocations = signal<string[]>([]);

  // Pagination
  currentPage = signal(1);
  itemsPerPage = signal(10);

  isLoading = signal(true);
  isFilterOpen = false;

  ngOnInit(): void {
    this.loadAgencies();
  }

  loadAgencies(): void {
    this.isLoading.set(true);

    this.agencyService.findAgencies().subscribe({
      next: (data) => {
        console.log(data);

        this.agencies.set(data);
        this.extractLocations(data);
        this.applyFiltersAndSort();
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading agencies:', error);
        this.isLoading.set(false);
      },
    });
  }

  extractLocations(agencies: IAgency[]): void {
    const locations = [...new Set(agencies.map((agency) => agency.place))];
    this.availableLocations.set(locations);
  }

  handleSearch(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
    this.applyFiltersAndSort();
  }

  handleSortChange(): void {
    this.applyFiltersAndSort();
  }

  handleFilterChange(filters: {
    minRating: number;
    locations: string[];
  }): void {
    this.filterMinRating.set(filters.minRating);
    this.filterLocations.set(filters.locations);
    this.currentPage.set(1);
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    let results = [...this.agencies()];

    // Apply search filter
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      results = results.filter(
        (agency) =>
          agency.name.toLowerCase().includes(term) ||
          agency.place.toLowerCase().includes(term) ||
          agency.email.toLowerCase().includes(term)
      );
    }

    // Apply rating filter
    if (this.filterMinRating() > 0) {
      results = results.filter(
        (agency) =>
          agency.ratings.length &&
          +agency.ratings[0].averageRating >= this.filterMinRating()
      );
    }

    // Apply location filter
    if (this.filterLocations().length > 0) {
      results = results.filter((agency) =>
        this.filterLocations().includes(agency.place)
      );
    }

    // Apply sorting
    switch (this.sortBy()) {
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        results.sort(
          (a, b) => +b.ratings[0].averageRating - +a.ratings[0].averageRating
        );
        break;
      case 'location':
        results.sort((a, b) => a.place.localeCompare(b.place));
        break;
    }

    this.filteredAgencies.set(results);
    this.updatePaginatedResults();
  }

  updatePaginatedResults(): void {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();

    this.paginatedAgencies.set(
      this.filteredAgencies().slice(startIndex, endIndex)
    );
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.updatePaginatedResults();
    // Scroll to top of the list for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onViewDetails(agencyId: string): void {
    // Navigate to agency details page
    // This would typically use Angular Router
  }

  onStartChat(agencyId: string): void {
    // Start chat with the agency
    // this.chatService.initializeChat(agencyId);
  }
}
