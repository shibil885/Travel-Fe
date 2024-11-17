import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OfferType } from '../../../../enum/offerType.enum';
import { HeaderComponent } from '../../header/header.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
})
export class OfferFormComponent implements OnInit {
  @Input() offer: any;
  @Input() packages: any[] = [];
  @Output() submitOffer = new EventEmitter<any>();

  offerForm!: FormGroup;
  offerTypes = Object.values(OfferType);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.offerForm = this.fb.group({
      title: [this.offer?.title || '', Validators.required],
      description: [this.offer?.description || '', Validators.required],
      discount_type: [this.offer?.discount_type || '', Validators.required],
      discount_value: [
        this.offer?.discount_value || '',
        [Validators.required, Validators.min(0)],
      ],
      expiry_date: [
        this.offer?.expiry_date
          ? new Date(this.offer.expiry_date).toISOString().split('T')[0]
          : '',
        Validators.required,
      ],
      isActive: [
        this.offer?.isActive !== undefined ? this.offer.isActive : true,
      ],
      applicable_packages: [
        this.offer?.applicable_packages || [],
        Validators.required,
      ],
      min_people: [this.offer?.min_people || 0, Validators.min(0)],
    });
  }

  onSubmit() {
    if (this.offerForm.valid) {
      this.submitOffer.emit(this.offerForm.value);
    }
  }
}
