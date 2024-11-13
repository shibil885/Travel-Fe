import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { IUser } from '../../../models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toaster.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  endWithSpace,
  invalidChar,
  letterOrNumber,
} from '../../../validatores/name.validator';
import { invalidPhone } from '../../../validatores/phone.validator';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // corrected styleUrl to styleUrls
})
export class ProfileComponent implements OnInit {
  user!: IUser;
  profileForm!: FormGroup;
  selectedProfileImage!: File;
  showChangePasswordModal = false;
  progress: number | null = null;
  isUploading: boolean = false;
  isEditing = false;

  passwordChange = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this._userService.getUserData().subscribe((res) => {
      if (res.success) {
        this.user = res.user;
        this.profileForm = new FormGroup({
          username: new FormControl(this.user.username, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            endWithSpace,
            letterOrNumber,
            invalidChar,
          ]),
          email: new FormControl(this.user.email, [
            Validators.required,
            Validators.email,
          ]),
          phone: new FormControl(this.user.phone, [
            Validators.required,
            invalidPhone,
          ]),
        });
      } else {
        this._router.navigate(['/home']);
      }
    });
  }

  onChangeProfilePicture(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const acceptableTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (acceptableTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append('profileImg', file);

        this.isUploading = true;
        this.progress = 0;

        this._userService.uploadProfileImg(formData).subscribe({
          next: (event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress && event.total) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event.type === HttpEventType.Response) {
              this._toastService.showToast(
                'Image uploaded successfully!',
                'success'
              );
              this.isUploading = false;
              this.progress = null;
              this.fetchUserData();
            }
          },
          error: () => {
            this._toastService.showToast('Upload failed', 'error');
            this.isUploading = false;
            this.progress = null;
          },
        });
      } else {
        this._toastService.showToast('Select a valid image file', 'error');
      }
    }
  }

  toggleEdit() {
    if (this.isEditing && this.profileForm.valid) {
      this.saveChanges();
    }
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    const updatedUserData = this.profileForm.value;
    this._userService.updateUserProfile(updatedUserData).subscribe((res) => {
      if (res.success) {
        this._toastService.showToast(res.message, 'success');
        this.user = { ...this.user, ...updatedUserData };
        this.isEditing = false;
      }
    });
  }

  changePassword() {
    if (
      this.passwordChange.newPassword !== this.passwordChange.confirmPassword
    ) {
      this._toastService.showToast('New passwords do not match', 'error');
      return;
    }
    console.log('Changing password', this.passwordChange);
    this.showChangePasswordModal = false;
  }
}
