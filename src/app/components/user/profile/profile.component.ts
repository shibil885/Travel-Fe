import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { IUser } from '../../../models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toaster.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user!: IUser;
  selectedProfileImage!: File;
  showChangePasswordModal = false;
  progress: number | null = null;

  passwordChange = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _ToastService: ToastService
  ) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this._userService.getUserData().subscribe((res) => {
      if (res.success) this.user = res.user;
      else if (!res.success) this._router.navigate(['/home']);
    });
  }

  onChangeProfilePicture(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file) {
      const acceptableTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (acceptableTypes.includes(file[0].type)) {
        const formData = new FormData();
        formData.append('profileImg', file[0]);

        this._userService.uploadProfileImg(formData).subscribe(
          (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                this.progress = event.total
                  ? Math.round((100 * event.loaded) / event.total)
                  : 0;
                break;
              case HttpEventType.Response:
                this.progress = null; // Reset progress after completion
                this._ToastService.showToast(
                  'Image uploaded successfully!',
                  'success'
                );
                this.fetchUserData();
                break;
            }
          },
          (error) => {
            this.progress = null;
            this._ToastService.showToast('Upload failed', 'error');
          }
        );
      } else {
        this._ToastService.showToast('Select a valid image file', 'error');
      }
    }
  }

  addPreference(pref: string) {
    if (pref && !this.user.preferences.includes(pref)) {
      this.user.preferences.push(pref);
    }
  }

  removePreference(pref: string) {
    this.user.preferences = this.user.preferences.filter((p) => p !== pref);
  }

  saveChanges() {
    // Implement save changes logic
    console.log('Saving changes', this.user);
  }

  changePassword() {
    if (
      this.passwordChange.newPassword !== this.passwordChange.confirmPassword
    ) {
      console.error('New passwords do not match');
      return;
    }
    // Implement change password logic
    console.log('Changing password', this.passwordChange);
    this.showChangePasswordModal = false;
  }
}
