import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen: boolean = false
}
