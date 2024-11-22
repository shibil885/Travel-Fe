import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AgencyService } from '../../../shared/services/agency.service';
import { OtpComponent } from '../otp/otp.component';
import { Store } from '@ngrx/store';
import {
  selectEmail,
  selectRenderOtpAgency,
} from '../../../store/agency/agency.selector';
import * as agencyActions from '../../../store/agency/agency.action';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [OtpComponent, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  reactiveForm!: FormGroup;
  invalidForm!: boolean;
  renderLogin!: boolean;
  renderOtp$ = this._store.select(selectRenderOtpAgency);
  mailToOtp$ = this._store.select(selectEmail);
  constructor(private _agencyService: AgencyService, private _store: Store) {}
  ngOnInit(): void {
    this.renderLogin = true;
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    const formValue = this.reactiveForm.value;
    if (this.reactiveForm.invalid) {
      this.invalidForm = true;
      return;
    } else if (!formValue) {
      this.invalidForm = true;
      return;
    }
    this._store.dispatch(
      agencyActions.agencyLogin({
        email: formValue.email,
        password: formValue.password,
      })
    );
    this.renderLogin = false;
  }
}
