import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  invalidChar,
  letterOrNumber,
  endWithSpace,
} from '../../../validatores/name.validator';
import {
  confirmPasswordValidator,
  lowerCase,
  noDigit,
  specialChar,
  upperCase,
} from '../../../validatores/password.validator';
import { invalidPlace } from '../../../validatores/place.validatores';
import { invalidPhone } from '../../../validatores/phone.validator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Existing } from '../../../validatores/existing.validator';
import { AgencyService } from '../../../shared/services/agency.service';
import { OtpComponent } from '../otp/otp.component';
import { UserService } from '../../../shared/services/user.service';
import { Store } from '@ngrx/store';
import { selectRenderOtpAgency } from '../../../store/agency/agency.selector';
import * as agencyActions from '../../../store/agency/agency.action';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    OtpComponent,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  formData!: FormData;
  reactiveForm!: FormGroup;
  invalidFile!: boolean;
  filename: string = '';
  isInvalidForm!: boolean;
  renderSignupForm!: boolean;
  renderOtpForm$ = this.store.select(selectRenderOtpAgency);
  constructor(
    private agencyService: AgencyService,
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.formData = new FormData();
    this.renderSignupForm = true;
    const existing = new Existing(this.agencyService, this.userService);
    this.reactiveForm = new FormGroup(
      {
        agencyName: new FormControl(
          null,
          [
            Validators.required,
            Validators.minLength(6),
            invalidChar,
            letterOrNumber,
            endWithSpace,
          ],
          existing.isExistingName.bind(existing)
        ),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          upperCase,
          lowerCase,
          noDigit,
          specialChar,
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          existing.isExistingEmail.bind(existing)
        ),
        phone: new FormControl(null, [Validators.required, invalidPhone]),
        place: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          invalidPlace,
        ]),
        document: new FormControl(null, [Validators.required]),
      },
      { validators: confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.filename = file.name;

    if (file && file.type !== 'application/pdf') {
      this.invalidFile = true;
      return;
    }
    this.invalidFile = false;
    this.formData.append('document', file);
  }

  onFormSubmitted() {
    if (this.reactiveForm.invalid) {
      this.isInvalidForm = true;
      return;
    } else if (this.invalidFile) {
      return;
    }

    const formValue = this.reactiveForm.value;
    this.formData.append('agencyName', formValue.agencyName);
    this.formData.append('password', formValue.password);
    this.formData.append('email', formValue.email);
    this.formData.append('phone', formValue.phone);
    this.formData.append('place', formValue.place);

    this.store.dispatch(
      agencyActions.agencySignup({ agencyData: this.formData })
    );
    this.renderSignupForm = false;
  }
}
