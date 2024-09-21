import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatIconModule } from "@angular/material/icon";
import { TableComponent } from '../../../shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from "../../../shared/components/category-form/category-form.component";
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../shared/services/admin-service.service';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, TableComponent, CategoriesComponent, CategoryFormComponent, MatIconModule, RouterModule, CommonModule, ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
title:string = 'Add Category'
openCategoryForm!: boolean;
data:any = []
columns = [
  { key: 'name', title: 'Name' },
  { key: 'description', title: 'Description' },
];

  constructor(private dialog: MatDialog, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllCategories().subscribe((data) => {
      this.data = data.categories
    })
  }
  addCategory() {
    this.title = 'Add Category'
    console.log(this.title);
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '500px',
      disableClose:false,
    });
    dialogRef.afterClosed().subscribe();
  }
}
