import { Component } from '@angular/core';
import { IPackage } from '../../../../interfaces/package.interface';
import { Store } from '@ngrx/store';
import {
  selectPackage,
  selectSucess,
} from '../../../../store/user/user.selector';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { Observable } from 'rxjs';
import { MatStepperModule } from '@angular/material/stepper';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-single-package',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MatStepperModule],
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

  renderPage$: Observable<boolean> = this.store.select(selectSucess);
  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.store.select(selectPackage).subscribe((data) => {
      if (data) {
        this.singlePackage = data;
        return;
      }
      return this.router.navigate(['packages']);
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
}
