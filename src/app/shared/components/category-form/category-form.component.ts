import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../../components/admin/header/header.component';
import { SideBarComponent } from '../../../components/admin/side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, CommonModule, MatIconModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
@Input() title!: string;
 
}
