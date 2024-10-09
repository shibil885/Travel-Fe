import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Package } from '../../../interfaces/package.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [HeaderComponent,RouterLink, FormsModule, CommonModule,],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class PackagesComponent  {
  packages: Package[] = [];
  filteredPackages: Package[] = [];
  searchTerm: string = '';
  constructor( private userPackages: UserService ) {}
  ngOnInit() {
    this.userPackages.getPackages().subscribe((res) => {
        this.packages = res.packages
    })
    // this.filteredPackages = this.packages;
  }

  filterPackages() {
    this.filteredPackages = this.packages.filter(pkg => 
      pkg.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      pkg.finalDestination.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortPackages(criteria: 'price' | 'rating') {
    // this.filteredPackages.sort((a, b) => {
    //   if (criteria === 'price') {
    //     return a.price - b.price;
    //   } else {
    //     return b.rating - a.rating;
    //   }
    // });
  }
}
