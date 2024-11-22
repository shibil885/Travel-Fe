import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService } from '../../../shared/services/categories.service';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { ToastService } from '../../../shared/services/toaster.service';
import { ICategory } from '../../../interfaces/category.interface';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    SearchComponent,
    PaginationComponent,
    TruncatePipe,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories: any[] = [];
  totalCategories!: number;
  limit: number = 5;
  currentPage: number = 1;
  showAddForm = false;
  editMode = false;
  currentCategoryId: string | null = null;
  headers = [
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Status', key: 'isActive' },
  ];

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private _categoryService: CategoryService,
    private _tosterService: ToastService
  ) {}

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
    this._categoryService
      .getCategories(this.currentPage, this.limit)
      .subscribe((data) => {
        this.categories = data.categories;
        this.totalCategories = data.totalCategories;
        this.currentPage = data.currentPage;
      });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.editMode) {
        this._categoryService
          .updateCategory(this.currentCategoryId, this.categoryForm.value)
          .subscribe(() => {
            this.getCategories();
            this.toggleAddForm();
          });
      } else {
        this._categoryService
          .addCategory(this.categoryForm.value)
          .subscribe(() => {
            this.getCategories();
            this.toggleAddForm();
          });
      }
    }
  }

  onEdit(category: ICategory) {
    this.showAddForm = true;
    this.editMode = true;
    this.currentCategoryId = category._id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
    });
  }
  onSearch(searchText: Event) {
    console.log(searchText);
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getCategories();
  }
  changeStatus(id: string, status: boolean) {
    this._categoryService.changeStatus(id, !status).subscribe((res) => {
      if (res.success) {
        console.log(res);
        if (res.warning) {
          this._tosterService.showToast(res.message, 'warning');
          this.getCategories();
          return;
        }
        this._tosterService.showToast(res.message, 'success');
        this.getCategories();
      }
    });
  }
}
