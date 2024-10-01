import { Component } from '@angular/core';
import { AgencyAuthService } from '../../../auth/services/agency/agency-auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AgencyAuthService) { }

  logout(){
    this.authService.clearAccessToken();
  }
}
