import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { title } from 'node:process';
import { TableComponent } from '../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { AddPackageComponent } from "../add-package/add-package.component";
import { AgencyService } from '../../../shared/services/agency.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    SideBarComponent,
    HeaderComponent,
    TableComponent,
    MatIconModule,
    CommonModule,
    AddPackageComponent
],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
})
export class PackagesComponent {
  renderTable!: boolean;
  renderAddForm!: boolean;
  renderEditForm!: boolean;
  column = [
    { key: 'name', title: 'Name' },
    { key: 'category_id', title: 'category' },
    { key: 'price', title: 'price' },
    { key: 'is_block', title: 'status' },
  ];
  data = [];

  constructor(private agencyService: AgencyService) {}

  ngOnInit(): void {
   this.renderTable = true;
  }
  addPackage() {
    this.renderTable = false;
    this.renderAddForm = true;
  }
}
