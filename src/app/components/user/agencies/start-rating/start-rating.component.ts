// star-rating.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center">
      <div class="flex">
        <ng-container *ngFor="let star of stars; let i = index">
          <!-- Full Star -->
          <svg
            *ngIf="star === 'full'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            [attr.aria-label]="'Rating: ' + (i + 1) + ' of 5'"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>

          <!-- Half Star -->
          <svg
            *ngIf="star === 'half'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            [attr.aria-label]="'Rating: ' + (i + 0.5) + ' of 5'"
          >
            <defs>
              <linearGradient
                id="halfStarGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="50%" stop-color="currentColor" />
                <stop offset="50%" stop-color="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              fill="url(#halfStarGradient)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>

          <!-- Empty Star -->
          <svg
            *ngIf="star === 'empty'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
            [attr.aria-label]="'Rating: ' + (i + 0) + ' of 5'"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </ng-container>
      </div>

      <!-- Numeric Rating Value -->
      <span *ngIf="showValue" class="ml-1 text-sm text-gray-600">
        {{ rating.toFixed(1) }}
      </span>

      <!-- Review Count if provided -->
      <span
        *ngIf="reviewCount !== undefined"
        class="ml-1 text-sm text-gray-500"
      >
        ({{ reviewCount }})
      </span>
    </div>
  `,
  styles: [],
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() showValue: boolean = false;
  @Input() reviewCount?: number;

  get stars(): string[] {
    const starsArray: string[] = [];
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsArray.push('full');
    }

    // Add half star if needed
    if (hasHalfStar) {
      starsArray.push('half');
    }

    // Fill remaining with empty stars
    while (starsArray.length < 5) {
      starsArray.push('empty');
    }

    return starsArray;
  }
}
