import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  endWithSpace,
  invalidChar,
  letterOrNumber,
} from '../../../../validatores/name.validator';
import { descriptionValidator } from '../../../../validatores/description.validator';
import { invalidPlace } from '../../../../validatores/place.validatores';
import { countryValidator } from '../../../../validatores/country.validator';
import { numberOfPeopleValidator } from '../../../../validatores/phone.validator';
import { PackageService } from '../../../../shared/services/package.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../shared/services/categories.service';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css',
})
export class AddPackageComponent {
  packageForm!: FormGroup;
  invalidIncluded!: boolean;
  invalidNotIncluded!: boolean;
  noOfDays: number = 0;
  invalidForm!: boolean;
  categories:any = [];
  constructor(
    private packageService: PackageService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res.categories
      console.log(this.categories);
    })
    this.packageForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        invalidChar,
        letterOrNumber,
        endWithSpace,
      ]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        descriptionValidator,
      ]),
      departure: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        invalidPlace,
      ]),
      finalDestination: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        invalidPlace,
      ]),
      country: new FormControl('', [Validators.required, countryValidator]),
      people: new FormControl('', [
        Validators.required,
        numberOfPeopleValidator,
      ]),
      included: new FormArray([new FormControl('', Validators.required)]),
      notIncluded: new FormArray([new FormControl('', Validators.required)]),
      days: new FormControl('', [Validators.required, numberOfPeopleValidator]),
      TourPlans: new FormArray([]),
    });

    this.packageForm.get('days')?.valueChanges.subscribe((day) => {
      this.updateTourPlaneFields(day);
    });
  }

  get included(): FormArray {
    return this.packageForm.get('included') as FormArray;
  }

  get notIncluded(): FormArray {
    return this.packageForm.get('notIncluded') as FormArray;
  }

  get TourPlans() {
    return this.packageForm.get('TourPlans') as FormArray;
  }

  addIncludes() {
    this.included.push(new FormControl(null, Validators.required));
    this.invalidIncluded = this.included.length === 0;
  }

  removeIncluded(index: number) {
    if (this.included.length === 1) {
      this.invalidIncluded = true;
      return;
    }
    this.included.removeAt(index);
    this.invalidIncluded = this.included.length === 0;
  }

  addNotIncludes() {
    this.notIncluded.push(new FormControl(null, Validators.required));
    this.invalidNotIncluded = this.notIncluded.length === 0;
  }

  removeNotIncluded(index: number) {
    if (this.notIncluded.length === 1) {
      this.invalidNotIncluded = true;
      return;
    }
    this.notIncluded.removeAt(index);
    this.invalidNotIncluded = this.notIncluded.length === 0;
  }

  updateTourPlaneFields(days: number) {
    while (this.TourPlans.length !== 0) {
      this.TourPlans.removeAt(0);
    }

    for (let i = 0; i < days; i++) {
      this.TourPlans.push(
        new FormGroup({
          day: new FormControl(i + 1),
          description: new FormControl('', [Validators.required]),
        })
      );
    }
  }

  onSubmit() {
    if (this.packageForm.invalid) {
      this.invalidForm = true;
      this.invalidIncluded = this.included.length === 0;
      this.invalidNotIncluded = this.notIncluded.length === 0;
      return;
    }

    this.invalidForm = false;
    console.log('Form Data:', this.packageForm.value);

    this.packageService.addPackages(this.packageForm.value).subscribe(
      () => {
        console.log('Package added successfully');

        this.router.navigate(['/agency/packages']);
      },
      (error) => {
        console.error('Error adding package', error);
      }
    );
  }
}
