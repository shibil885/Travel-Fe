import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';

interface User {
  email: string;
  username: string;
  profilePicture?: string;
  phone?: number;
  preferences: string[];
  isActive: boolean;
  isVerified: boolean;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderSidebarComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: User = {
    email: '',
    username: '',
    profilePicture: '',
    phone: undefined,
    preferences: [],
    isActive: false,
    isVerified: false,
  };

  showChangePasswordModal = false;
  passwordChange = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  ngOnInit() {
    // Simulating fetching user data
    this.user = {
      email: 'user@example.com',
      username: 'johndoe',
      profilePicture: '',
      phone: 1234567890,
      preferences: ['Travel', 'Photography'],
      isActive: true,
      isVerified: true,
    };
  }

  onChangeProfilePicture() {
    // Implement profile picture change logic
    console.log('Changing profile picture');
  }

  addPreference(pref: string) {
    if (pref && !this.user.preferences.includes(pref)) {
      this.user.preferences.push(pref);
    }
  }

  removePreference(pref: string) {
    this.user.preferences = this.user.preferences.filter(p => p !== pref);
  }

  saveChanges() {
    // Implement save changes logic
    console.log('Saving changes', this.user);
  }

  changePassword() {
    if (this.passwordChange.newPassword !== this.passwordChange.confirmPassword) {
      console.error('New passwords do not match');
      return;
    }
    // Implement change password logic
    console.log('Changing password', this.passwordChange);
    this.showChangePasswordModal = false;
  }
}