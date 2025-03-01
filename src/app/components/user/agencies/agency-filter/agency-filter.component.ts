// agency-filter.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agency-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 class="text-lg font-medium text-gray-800 mb-4">Filter Options</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Rating Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <div class="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              [(ngModel)]="localMinRating"
              (ngModelChange)="onFilterChange()"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-900 font-medium">{{ localMinRating }}</span>
          </div>
        </div>

        <!-- Locations Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Locations
          </label>
          <div class="max-h-40 overflow-y-auto space-y-2 pr-2">
            <div *ngFor="let location of locations" class="flex items-center">
              <input
                type="checkbox"
                [id]="'location-' + location"
                [value]="location"
                [checked]="isLocationSelected(location)"
                (change)="toggleLocation(location)"
                class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                [for]="'location-' + location"
                class="ml-2 text-sm text-gray-700"
              >
                {{ location }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Actions -->
      <div class="flex justify-end mt-6 gap-2">
        <button
          (click)="resetFilters()"
          class="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          Reset
        </button>
        <button
          (click)="applyFilters()"
          class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class AgencyFilterComponent implements OnInit {
  @Input() minRating: number = 0;
  @Input() locations: string[] = [];
  @Input() selectedLocations: string[] = [];

  @Output() filterChange = new EventEmitter<{
    minRating: number;
    locations: string[];
  }>();

  localMinRating: number = 0;
  localSelectedLocations: string[] = [];

  ngOnInit(): void {
    this.localMinRating = this.minRating;
    this.localSelectedLocations = [...this.selectedLocations];
  }

  isLocationSelected(location: string): boolean {
    return this.localSelectedLocations.includes(location);
  }

  toggleLocation(location: string): void {
    if (this.isLocationSelected(location)) {
      this.localSelectedLocations = this.localSelectedLocations.filter(
        (loc) => loc !== location
      );
    } else {
      this.localSelectedLocations.push(location);
    }

    this.onFilterChange();
  }

  onFilterChange(): void {
    // Using debounce here would be ideal for range inputs
  }

  applyFilters(): void {
    this.filterChange.emit({
      minRating: this.localMinRating,
      locations: this.localSelectedLocations,
    });
  }

  resetFilters(): void {
    this.localMinRating = 0;
    this.localSelectedLocations = [];

    this.filterChange.emit({
      minRating: 0,
      locations: [],
    });
  }
}
