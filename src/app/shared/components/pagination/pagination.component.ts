import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() totalPages: number = 0; 
  @Input() currentPage: number = 1; 
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(); 

  get pageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5;

    const startPage = Math.max(2, this.currentPage - 2);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    if (startPage > 2) {
      pages.push(1);
      if (startPage > 3) pages.push(-1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < this.totalPages - 1) {
      if (endPage < this.totalPages - 2) pages.push(-1); 
      pages.push(this.totalPages);
    }

    return pages;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(Number(this.currentPage) - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(Number(this.currentPage) + 1);
    }
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
