// import { Component } from '@angular/core';

// @Component({
//   templateUrl: './recent-booking.component.html',
//   styleUrl: './recent-booking.component.css'
// })
// export class RecentBookingComponent {

// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-booking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h2>
      <ul class="divide-y divide-gray-200">
        <li *ngFor="let project of recentProjects" class="py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <span
                class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ project.name }}
              </p>
              <p class="text-sm text-gray-500 truncate">
                {{ project.client }}
              </p>
            </div>
            <div>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                [ngClass]="{
                  'bg-green-100 text-green-800': project.status === 'Active',
                  'bg-yellow-100 text-yellow-800': project.status === 'Pending',
                  'bg-red-100 text-red-800': project.status === 'Delayed'
                }"
              >
                {{ project.status }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
export class RecentBookingComponent {
  recentProjects = [
    { name: 'Website Redesign', client: 'TechCorp', status: 'Active' },
    { name: 'Mobile App Development', client: 'StartupX', status: 'Pending' },
    { name: 'Brand Identity', client: 'FashionCo', status: 'Active' },
    { name: 'SEO Optimization', client: 'LocalBiz', status: 'Delayed' },
  ];
}
