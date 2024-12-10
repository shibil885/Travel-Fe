import { Component } from '@angular/core';
import { IPackage } from '../../../../interfaces/package.interface';
import { Store } from '@ngrx/store';
import {
  selectPackage,
  selectSuccess,
} from '../../../../store/user/user.selector';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatStepperModule } from '@angular/material/stepper';
import { trigger, transition, style, animate } from '@angular/animations';
import { HeaderSidebarComponent } from '../../header-and-side-bar/header-and-side-bar.component';

@Component({
  selector: 'app-single-package',
  standalone: true,
  imports: [HeaderSidebarComponent, CommonModule, MatStepperModule],
  templateUrl: './single-package.component.html',
  styleUrl: './single-package.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class SinglePackageComponent {
  info: boolean = true;
  plane: boolean = false;
  gallery: boolean = false;

  singlePackage!: IPackage;

  renderPage$: Observable<boolean> = this._store.select(selectSuccess);
  constructor(private _store: Store, private _router: Router) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._store.select(selectPackage).subscribe((data) => {
      if (data) {
        this.singlePackage = data;
        return;
      }
      return this._router.navigate(['packages']);
    });
  }
  onInfo() {
    this.info = true;
    this.plane = false;
    this.gallery = false;
  }
  onPlane() {
    this.plane = true;
    this.info = false;
    this.gallery = false;
  }
  onGallery() {
    this.gallery = true;
    this.info = false;
    this.plane = false;
  }

  getStarCounts(averageRating: string) {
    const fullStars = Math.floor(Number(averageRating));
    const hasHalfStar = Number(averageRating) % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(Number(averageRating));

    return {
      fullStars,
      hasHalfStar,
      emptyStars
    };
  }
}
