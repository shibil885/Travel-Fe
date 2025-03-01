// agency-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IAgency } from '../../../../models/agency.model';
import { StarRatingComponent } from '../start-rating/start-rating.component';

@Component({
  selector: 'app-agency-card',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent],
  template: `
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <!-- Agency Image -->
      <div class="relative h-48 p-4" [ngStyle]="backgroundStyle">
        <div
          class="w-full h-full flex items-center justify-center bg-opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
      </div>

      <!-- Agency Info -->
      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <h3
            class="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            {{ agency.name }}
          </h3>
          <app-star-rating
            *ngIf="agency.ratings.length"
            [rating]="+agency.ratings[0].averageRating"
            [showValue]="true"
            class="flex-shrink-0"
          ></app-star-rating>
        </div>

        <p class="text-gray-600 mb-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {{ agency.place }}
        </p>

        <div class="text-sm text-gray-600 mb-1">
          <div class="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span class="truncate">{{ agency.email }}</span>
          </div>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{{ agency.phone }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div
          class="flex justify-center items-center mt-auto pt-3 border-t border-gray-100"
        >
          <button
            (click)="startChat.emit(agency._id)"
            class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Chat
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./agency-card.component.css'],
})
export class AgencyCardComponent {
  @Input() agency!: IAgency;
  @Output() startChat = new EventEmitter<string>();
  softColors = [
    '#FAF3E0',
    '#D6E6F2',
    '#F8E1E7',
    '#D1F5D3',
    '#F5E6CA',
    '#E8DAEF',
  ];

  backgroundStyle = {
    backgroundColor: this.getRandomColor(),
    borderRadius: '12px',
  };

  getRandomColor() {
    return this.softColors[Math.floor(Math.random() * this.softColors.length)];
  }
}
