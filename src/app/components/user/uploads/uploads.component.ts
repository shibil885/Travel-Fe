import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
interface Post {
  id: number;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  createdAt: Date;
  user: {
    username: string;
    profilePicture: string;
  };
}

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class UploadsComponent {
  posts: Post[] = [];
  selectedPost: Post | null = null;
  isUploadModalOpen = false;
  newPostImage: string | ArrayBuffer | null = null;
  newPostCaption = '';

  constructor() {}

  ngOnInit(): void {}

  openPostModal(post: Post): void {
    this.selectedPost = post;
  }

  closePostModal(): void {
    this.selectedPost = null;
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  openUploadModal(): void {
    this.isUploadModalOpen = true;
  }

  closeUploadModal(): void {
    this.isUploadModalOpen = false;
    this.newPostImage = null;
    this.newPostCaption = '';
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newPostImage = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadNewPost(): void {
    if (this.newPostImage && this.newPostCaption) {
      const newPost: Post = {
        id: this.posts.length + 1,
        imageUrl: this.newPostImage as string,
        caption: this.newPostCaption,
        likes: 0,
        comments: 0,
        createdAt: new Date(),
        user: {
          username: 'current_user',
          profilePicture: 'https://picsum.photos/id/64/100/100',
        },
      };
      this.posts.unshift(newPost);
      this.closeUploadModal();
    }
  }
}

