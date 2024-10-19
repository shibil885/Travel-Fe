import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html' ,
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 5;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get visiblePages(): (number | string)[] {
    const totalPages = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(totalPages - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (range[range.length - 1] < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (range[range.length - 1] !== totalPages) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }

  onPageChange(page: number | string | null = null): void {
    if (!page) {
      this.pageChange.emit(Number(this.currentPage) + 1);
      return;
    }
    const pageToShow = Number(page);
    if (pageToShow <= this.totalPages && pageToShow !== this.currentPage) {
      this.currentPage = pageToShow;
      this.pageChange.emit(pageToShow);
    }
  }
}
