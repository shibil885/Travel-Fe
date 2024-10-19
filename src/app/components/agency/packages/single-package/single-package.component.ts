import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { IPackage } from '../../../../interfaces/package.interface';
import { PackageService } from '../../../../shared/services/package.service';
import { ToastService } from '../../../../shared/services/toaster.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-single-package',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
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
  @Input() package!: IPackage;
  @Output() closePageEvent = new EventEmitter();
  editedPackage!: IPackage;
  isEditing = false;
  currentImageIndex = 0;
  currentImage = '';
  isChangingImage = false;
  expandedPlan: number | null = null;

  constructor(
    private packageService: PackageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.currentImage = this.package.images[0];
    console.log(this.currentImage);
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
    this.packageService
      .onSaveChanges(this.editedPackage, this.package._id)
      .subscribe((res) => {
        if (res.success) {
          this.toastService.showToast(res.message, 'success');
        }
      });
  }

  toggleStatus(packageId: string | undefined) {
    if (this.package.isActive) {
      this.package.isActive = !this.package.isActive;
      this.packageService.onChangeStatus(packageId, false)?.subscribe();
      return;
    }
    this.package.isActive = !this.package.isActive;
    this.packageService.onChangeStatus(packageId, true)?.subscribe();
    return;
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
    const currentPlansCount = this.editedPackage.tourPlans.length;
    const newDaysCount = Number(this.editedPackage.days);

    if (newDaysCount > currentPlansCount) {
      for (let i = currentPlansCount + 1; i <= newDaysCount; i++) {
        this.editedPackage.tourPlans.push({
          day: i,
          title: '',
          description: '',
        });
      }
    } else if (newDaysCount < currentPlansCount) {
      this.editedPackage.tourPlans = this.editedPackage.tourPlans.slice(
        0,
        newDaysCount
      );
    }
  }
  onCloseForm() {
    this.closePageEvent.emit()
  }
}
