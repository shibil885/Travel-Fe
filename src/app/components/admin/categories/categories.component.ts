import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../shared/services/categories.service';  // Adjust the path
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone:true,
  imports: [HeaderComponent,SideBarComponent, SearchComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  showAddForm = false;
  editMode = false;
  currentCategoryId: string | null = null;

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.editMode = false;
    this.currentCategoryId = null;
    this.categoryForm.reset();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.categories;
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.editMode) {
        this.categoryService
          .updateCategory(this.currentCategoryId, this.categoryForm.value)
          .subscribe(() => {
            this.getCategories();
            this.toggleAddForm();
          });
      } else {
        // Add new category
        this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
          this.getCategories();
          this.toggleAddForm();
        });
      }
    }
  }

  onEdit(category: any) {
    this.showAddForm = true;
    this.editMode = true;
    this.currentCategoryId = category._id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
    });
  }
}
