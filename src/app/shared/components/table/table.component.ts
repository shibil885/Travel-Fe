import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {


@Input() data: any[] = [];
@Input() columns: { key: string , title: string }[] = [];
@Output() changeStatusEvent = new EventEmitter()
 sortable!: boolean 


  changeStatus(user: any) {
    this.changeStatusEvent.emit(user)
  }
}
