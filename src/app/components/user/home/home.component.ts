import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderAndSideBarComponent } from '../header-and-side-bar/header-and-side-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
