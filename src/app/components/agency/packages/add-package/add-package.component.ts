import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PackageService } from '../../../../shared/services/package.service';
import { ICategory } from '../../../../interfaces/category.interface';
import { ToastService } from '../../../../shared/services/toaster.service';
@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AddPackageComponent {
  packageForm: FormGroup;
  categories!: ICategory[];
  selectedFiles: File[] = [];
  selectedImages: string[] = [];
  @ViewChild('imageError') imageError!: ElementRef;
  @Output() addFormCloseEvent = new EventEmitter();
  private formData = new FormData();

  constructor(
    private packageService: PackageService,
    private toasterService: ToastService
  ) {
    this.packageForm = new FormGroup({
      packageInfo: new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        category: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
      }),
      travelInfo: new FormGroup({
        departure: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        finalDestination: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        price: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ]),
        people: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]),
        days: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]\d*$/),
        ]),
      }),
      packageFeatures: new FormGroup({
        included: new FormArray([new FormControl('', Validators.required)]),
        notIncluded: new FormArray([new FormControl('', Validators.required)]),
      }),
      tourPlans: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.packageService.getCategories().subscribe((res) => {
      this.categories = res.categories;
    });
    this.packageForm.get('travelInfo.days')?.valueChanges.subscribe((days) => {
      this.updateTourPlans(Number(days));
    });
  }

  get included(): FormArray {
    return this.packageForm.get('packageFeatures.included') as FormArray;
  }

  get notIncluded(): FormArray {
    return this.packageForm.get('packageFeatures.notIncluded') as FormArray;
  }

  get tourPlans(): FormArray {
    return this.packageForm.get('tourPlans') as FormArray;
  }
  addIncludedItem(): void {
    if (this.included.length < 10) {
      this.included.push(new FormControl('', Validators.required));
    }
  }

  removeIncludedItem(index: number): void {
    if (this.included.length > 1) {
      this.included.removeAt(index);
    }
  }

  addNotIncludedItem(): void {
    if (this.notIncluded.length < 10) {
      this.notIncluded.push(new FormControl('', Validators.required));
    }
  }

  removeNotIncludedItem(index: number): void {
    if (this.notIncluded.length > 1) {
      this.notIncluded.removeAt(index);
    }
  }

  updateTourPlans(days: number): void {
    const currentPlans = this.tourPlans.length;
    if (days > currentPlans) {
      for (let i = currentPlans; i < days; i++) {
        this.tourPlans.push(
          new FormGroup({
            day: new FormControl(i + 1, Validators.required),
            title: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
            ]),
            description: new FormControl('', [
              Validators.required,
              Validators.minLength(10),
            ]),
          })
        );
      }
    } else if (days < currentPlans) {
      for (let i = currentPlans - 1; i >= days; i--) {
        this.tourPlans.removeAt(i);
      }
    }
  }

  onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.imageError.nativeElement.innerText = '';
    let imageCount = 0;

    if (files && files.length > 6) {
      const acceptableTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      for (let i = 0; i < files.length; i++) {
        if (acceptableTypes.includes(files[i].type)) {
          if (imageCount === 6) {
            this.imageError.nativeElement.innerText =
              'You cannot upload more than 6 images!';
            return;
          }
          imageCount++;
          const reader = new FileReader();
          this.selectedFiles.push(files[i]);
          reader.onload = (e: any) => {
            this.selectedImages = [...this.selectedImages, e.target.result];
          };
          reader.readAsDataURL(files[i]);
        }
      }
      this.imageError.nativeElement.innerText = `${
        files.length - imageCount
      } of the selected files are not images`;
      return;
    } else if (files?.length !== 0 && files !== null) {
      const acceptableTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      for (let i = 0; i < files.length; i++) {
        if (acceptableTypes.includes(files[i].type)) {
          imageCount++;
          const reader = new FileReader();
          this.selectedFiles.push(files[i]);

          reader.onload = (e: any) => {
            this.selectedImages = [...this.selectedImages, e.target.result];
          };
          reader.readAsDataURL(files[i]);
        }
      }
      if (files.length !== imageCount) {
        this.imageError.nativeElement.innerText = `${
          files.length - imageCount
        } of the selected files are not images`;
      }
    }
  }
  deleteImage(index: number) {
    this.selectedFiles.splice(index, 1);
    return this.selectedImages.splice(index, 1);
  }
  replaceImage(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        this.imageError.nativeElement.innerText =
          'Selected file is not image';
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles[index] = file;
        this.selectedImages[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    console.log('Form :', this.packageForm.value);
    if (this.selectedImages.length < 1) {
      this.imageError.nativeElement.innerText = 'Image is required';
      return;
    }
    if (this.packageForm.valid) {
      const formValues = this.packageForm.value;
      this.formData.append(
        'packageInfo',
        JSON.stringify(formValues.packageInfo)
      );
      this.formData.append('travelInfo', JSON.stringify(formValues.travelInfo));
      this.formData.append(
        'packageFeatures',
        JSON.stringify(formValues.packageFeatures)
      );
      this.formData.append('tourPlans', JSON.stringify(formValues.tourPlans));
      this.selectedFiles.forEach((file: File) => {
        this.formData.append('images', file);
      });
      this.packageService.addPackages(this.formData).subscribe((res) => {
        if (res.success) {
          this.toasterService.showToast(res.message, 'success');
          this.onCloseForm();
        }
      });
    }
  }
  onCloseForm() {
    this.addFormCloseEvent.emit();
  }
}
