import { Component } from '@angular/core';
import { AgencyAuthService } from '../../../auth/services/agency/agency-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  constructor(private authService: AgencyAuthService) { }

  logout(){
    this.authService.clearAccessToken();
  }
}
