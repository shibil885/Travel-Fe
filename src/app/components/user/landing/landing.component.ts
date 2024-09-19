import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule} from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ MatIconModule, CommonModule, MatCardModule,RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
    isMenuOpen:boolean = false;
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
}
