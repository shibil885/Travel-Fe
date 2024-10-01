import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css',
})
export class ListTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string; title: string }[] = [];
  @Output() changeStatusEvent = new EventEmitter();
  sortable!: boolean;

  changeStatus(user: any) {
    this.changeStatusEvent.emit(user);
  }
}
