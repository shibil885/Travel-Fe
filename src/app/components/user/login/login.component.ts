import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../../../store/user/user.action';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { selectRenderOtpUser } from '../../../store/user/user.selector';
import { OtpComponent } from '../otp/otp.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [OtpComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  reactiveForm!: FormGroup;
  invalidForm!: boolean;
  renderLogin: boolean = true;
  renderOtp: boolean = false;
  constructor(private _store: Store) {
    this._store.select(selectRenderOtpUser).subscribe((res) => {
      this.renderOtp = res;
      this.renderLogin = false;
    });
  }
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    this.renderLogin = true;
    this.renderOtp = false
  }
  ngOnDestroy(): void {
    this.renderLogin = true;
    this.renderOtp = false
  }
  onSubmitting() {
    const formValue = this.reactiveForm.value;
    if (this.reactiveForm.invalid) {
      this.invalidForm = true;
      return;
    } else if (!formValue) {
      this.invalidForm = true;
      return;
    }
    this._store.dispatch(
      userActions.userLogin({
        email: formValue.email,
        password: formValue.password,
      })
    );
  }
}
