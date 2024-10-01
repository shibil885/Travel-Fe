import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


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
  @Output() confirmationEvent = new EventEmitter();
  sortable!: boolean;

  changeStatus(agency: Event) {
    this.changeStatusEvent.emit(agency);
  }
  confirmation(agency: Event) {
    this.confirmationEvent.emit(agency)
  }
}
