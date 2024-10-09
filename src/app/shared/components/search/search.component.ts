import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() searchUsersEvent = new EventEmitter()
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchText: [''],
    });
  }

  onSubmit(): void {
    const searchText = this.searchForm.get('searchText')?.value;
    this.searchUsersEvent.emit(searchText);
  }
}
