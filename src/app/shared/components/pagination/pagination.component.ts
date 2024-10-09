import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number | string ): void {
    if (Number(page) >= 1 && Number(page) <= this.totalPages) {
      this.pageChange.emit(Number(page));
    }
  }

  visiblePages(): (number | string)[] 
  {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number;

    range.push(1);

    if (this.totalPages <= 1) {
      return range;
    }

    for (let i = this.currentPage - delta; i <= this.currentPage + delta; i++) {
      if (i < this.totalPages && i > 1) {
        range.push(i);
      }
    }
    range.push(this.totalPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
     return [1];
  }
}
