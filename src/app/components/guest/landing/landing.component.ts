import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SignInModalComponent } from '../../../shared/components/sign-in-modal/sign-in-modal.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  isMenuOpen = false;

  constructor(private dialog: MatDialog) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openLoginSignupModal() {
    this.dialog.open(SignInModalComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container',
      hasBackdrop: true, 
      disableClose: false,
    });
  }
}
