// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-new-categories',
//   standalone: true,
//   imports: [],
//   templateUrl: './new-categories.component.html',
//   styleUrl: './new-categories.component.css'
// })
// export class NewCategoriesComponent {

// }
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Top Clients</h2>
      <ul class="divide-y divide-gray-200">
        <li *ngFor="let client of topClients" class="py-4 flex items-center justify-between">
          <div class="flex items-center">
            <img class="h-10 w-10 rounded-full" [src]="client.logo" [alt]="client.name">
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ client.name }}</p>
              <p class="text-sm text-gray-500">{{ client.industry }}</p>
            </div>
          </div>
          <div class="text-sm text-gray-500">{{ client.revenue | currency }}</div>
        </li>
      </ul>
    </div>
  `
})
export class NewCategoriesComponent {
  topClients = [
    { name: 'TechCorp', industry: 'Technology', revenue: 150000, logo: 'https://via.placeholder.com/40' },
    { name: 'StartupX', industry: 'SaaS', revenue: 120000, logo: 'https://via.placeholder.com/40' },
    { name: 'FashionCo', industry: 'Retail', revenue: 100000, logo: 'https://via.placeholder.com/40' },
    { name: 'LocalBiz', industry: 'Services', revenue: 80000, logo: 'https://via.placeholder.com/40' },
  ];
}

