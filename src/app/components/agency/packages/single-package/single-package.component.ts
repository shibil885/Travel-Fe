import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Package } from '../../../../interfaces/package.interface';
import { PackageService } from '../../../../shared/services/package.service';
@Component({
  selector: 'app-single-package',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-package.component.html',
  styleUrl: './single-package.component.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '48px', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SinglePackageComponent {
  @Input() package!: Package;
  editedPackage!: Package;
  isEditing = false;
  currentImageIndex = 0;
  currentImage = '';
  isChangingImage = false;
  expandedPlan: number | null = null;

  constructor(private packageService: PackageService) {}

  ngOnInit() {
    console.log('ppppppp',this.package);
    // this.currentImage = this.package.images
    this.startImageRotation();
    this.editedPackage = JSON.parse(JSON.stringify(this.package));
  }

  startImageRotation() {
    setInterval(() => {
      this.changeImage(
        (this.currentImageIndex + 1) % this.package.images.length
      );
    }, 5000);
  }

  changeImage(index: number) {
    this.isChangingImage = true;
    setTimeout(() => {
      this.currentImageIndex = index;
      this.currentImage = this.package.images[index];
      this.isChangingImage = false;
    }, 500);
  }

  togglePlan(index: number) {
    this.expandedPlan = this.expandedPlan === index ? null : index;
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editedPackage = JSON.parse(JSON.stringify(this.package));
    }
  }

  saveChanges() {
    this.package = JSON.parse(JSON.stringify(this.editedPackage));
    this.isEditing = false;
    this.packageService.onSaveChanges(this.package).subscribe(() => {
      console.log('Package updated:', this.package);
    })
  }

  toggleStatus(packageId: string | undefined) {
    if (this.package.isActive) {
      this.packageService.onChangeStatus(packageId, false)?.subscribe();
      return
    }
    this.package.isActive = !this.package.isActive;
    this.packageService.onChangeStatus(packageId, true)?.subscribe();
    return
  }

  addIncluded() {
    this.editedPackage.included.push('');
  }

  removeIncluded(index: number) {
    this.editedPackage.included.splice(index, 1);
  }

  addNotIncluded() {
    this.editedPackage.notIncluded.push('');
  }

  removeNotIncluded(index: number) {
    this.editedPackage.notIncluded.splice(index, 1);
  }

  updateTourPlans() {
    const currentPlansCount = this.editedPackage.TourPlans.length;
    const newDaysCount = Number(this.editedPackage.days);

    if (newDaysCount > currentPlansCount) {
      for (let i = currentPlansCount + 1; i <= newDaysCount; i++) {
        this.editedPackage.TourPlans.push({ day: i, description: '' });
      }
    } else if (newDaysCount < currentPlansCount) {
      this.editedPackage.TourPlans = this.editedPackage.TourPlans.slice(
        0,
        newDaysCount
      );
    }
  }
}
