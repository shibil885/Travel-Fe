import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaskEmailPipe } from '../../../shared/pipes/mask-email.pipe';
import * as agencyActions from '../../../store/agency/agency.action';
import { Store } from '@ngrx/store';
import { IAgency } from '../../../models/agency.model';
import { selectEmail } from '../../../store/agency/agency.selector';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaskEmailPipe],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent {
  otpForm!: FormGroup;
  submitted: boolean = false;
  timeLeft: number = 60;
  timer!: number;
  isResendEnabled: boolean = false;
  email!: string | undefined;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.select(selectEmail).subscribe((data) => (this.email = data));
    this.startOtpTimer();
    this.otpForm = new FormGroup({
      otp: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  startOtpTimer() {
    this.timeLeft = 60;
    this.isResendEnabled = false;

    this.timer = window.setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.isResendEnabled = true;
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onFormSubmit() {
    this.submitted = true;

    if (this.otpForm.invalid) {
      return;
    }
    const otp = this.otpForm.value;
    this._store.dispatch(
      agencyActions.submitOtp({ email: this.email, otp: otp?.otp })
    );
  }

  get otpControl() {
    return this.otpForm.get('otp');
  }

  resendOtp() {
    if (this.isResendEnabled) {
      this._store.dispatch(agencyActions.resendOtp({ email: this.email }));
      this.startOtpTimer();
    }
  }
}
