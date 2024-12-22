import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  confirmPasswordValidator,
  lowerCase,
  noDigit,
  specialChar,
  upperCase,
} from '../../../validatores/password.validator';
import { invalidPhone } from '../../../validatores/phone.validator';
import { UserService } from '../../../shared/services/user.service';
import { OtpComponent } from '../otp/otp.component';
import { Existing } from '../../../validatores/existing.validator';
import { AgencyService } from '../../../shared/services/agency.service';
import { Store } from '@ngrx/store';
import {
  selectEmail,
  selectRenderOtpUser,
} from '../../../store/user/user.selector';
import * as userActions from '../../../store/user/user.action';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [OtpComponent,  ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  reactiveForm!: FormGroup;
  isInvalidForm: boolean = false;
  renderOtp$ = this._store.select(selectRenderOtpUser);
  renderSignup: boolean = true;
  mailToOtp$ = this._store.select(selectEmail);
  constructor(
    private _userService: UserService,
    private _agencyService: AgencyService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    const existing = new Existing(this._agencyService, this._userService);
    this.reactiveForm = new FormGroup(
      {
        userName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          existing.isExistingEmailUser.bind(existing)
        ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          upperCase,
          lowerCase,
          noDigit,
          specialChar,
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
        phone: new FormControl('', [Validators.required, invalidPhone]),
      },
      { validators: confirmPasswordValidator('password', 'confirmpassword') }
    );
  }

  onSubmit(): void {
    if (!this.reactiveForm.valid) {
      this.isInvalidForm = true;
      return;
    }
    this.renderSignup = false;
    const formValue = this.reactiveForm.value;
    console.log('data from ts', formValue);
    this._store.dispatch(userActions.userSignup({ userdata: formValue }));
  }
}
