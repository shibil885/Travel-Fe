import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShowDetailsComponent } from '../show-details/show-details.component';
import { IAgency } from '../../../models/agency.model';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-reusable-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  imports: [ ShowDetailsComponent,CommonModule, FormsModule,]
})
export class ReusableTableComponent {
  @Input() data: any[] = []; 
  @Input() headers: { label: string, key: string }[] = [];  
  filteredData = [...this.data];
  constructor(private dialog: MatDialog) {}

  filter(event: Event) {
    const filter = (event.target as HTMLSelectElement).value;
    this.filteredData = filter
      ? this.data.filter((item) => item.role === filter)
      : [...this.data];
  }
  showSinglePersonDetails(user: IAgency | IUser) {    
    this.dialog.open(ShowDetailsComponent, {
      width: '400px',
      data: user,
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      disableClose:false,
        position: { 
          right: '20px', 
        }
    });
  }
}
