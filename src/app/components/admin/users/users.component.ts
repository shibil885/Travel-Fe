import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminService, } from '../../../shared/services/admin-service.service';
import { title } from 'process';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ HeaderComponent, SideBarComponent, TableComponent, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  columns = [
    { key: 'email', title: 'Email'},
    { key: 'is_Active', title: 'Status'}

  ]
  users: any[] = []
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((data) => this.users = data.users);
  }
  changeStatus(user: any) {
    let status!: boolean 
    if (user.is_Active) {
      status = true
    }else{
      status = false
    }
    this.adminService.changeUseStatus(user._id,status).subscribe(()=>{
      console.log('Success fully upgraded');
    })
  }
} 
