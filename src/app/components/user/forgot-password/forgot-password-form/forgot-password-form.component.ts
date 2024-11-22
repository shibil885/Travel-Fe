import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  lowerCase,
  noDigit,
  specialChar,
  upperCase,
} from '../../../../validatores/password.validator';
import { UserService } from '../../../../shared/services/user.service';
import { ToastService } from '../../../../shared/services/toaster.service';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.css',
})
export class ForgotPasswordFormComponent {
  newPasswordForm!: FormGroup;
  id: string | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    if (!this.id) {
      this._toastService.showToast('Id not provided', 'error');
      return;
    }
    this.newPasswordForm = new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          upperCase,
          lowerCase,
          noDigit,
          specialChar,
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onSubmitNewPassword(): void {
    if (this.newPasswordForm.valid && this.id) {
      const newPassword = this.newPasswordForm.get('newPassword')?.value;
      this._userService
        .resetPassword(
          this.id,
          newPassword
        )
        .subscribe((res) => {
          if (res.success) {
            this._toastService.showToast(res.message, 'success');
            this._router.navigate(['login']);
          }
        });
      console.log(
        'Resetting password with token:',
        this.id,
        'and new password:',
        newPassword
      );
    } else {
      this.newPasswordForm.markAllAsTouched();
    }
  }
}
