import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../../shared/services/admin-service.service';
import { title } from 'process';

@Component({
  selector: 'app-agencies',
  standalone: true,
  imports: [ HeaderComponent, SideBarComponent, TableComponent, MatIconModule],
  templateUrl: './agencies.component.html',
  styleUrl: './agencies.component.css'
})
export class AgenciesComponent {
  agencies: any = [] 
  columns = [
    {key: 'name', title:'Name'},
    {key: 'is_Active', title: 'Status'}
  ]
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllAgencies().subscribe((data) => {
      this.agencies = data.agencies
    })
  }
}
