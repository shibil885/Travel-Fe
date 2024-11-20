import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { validateCaption } from '../../../validatores/caption.validator';
import { PostService } from '../../../shared/services/post.service';
import { ToastService } from '../../../shared/services/toaster.service';
import { IPost } from '../../../interfaces/post.interface';

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
  posts: IPost[] = [];
  selectedPost: IPost | null = null;
  isUploadModalOpen = false;
  newPostImage: string | ArrayBuffer | null = null;
  imageError: string | null = null;
  postForm!: FormGroup;
  selectedImage!: File;
  constructor(
    private readonly _postService: PostService,
    private readonly _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this._postService.fetchPosts().subscribe((res) => {
      console.log('response', res.posts);
      this.posts = res.posts;
    });
  }

  openPostModal(post: IPost): void {
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
    this.postForm = new FormGroup({
      caption: new FormControl('', [validateCaption()]),
      image: new FormControl('', [Validators.required]),
    });
  }

  closeUploadModal(): void {
    this.isUploadModalOpen = false;
    this.newPostImage = null;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.imageError = null;

    if (file) {
      const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxFileSize = 5 * 1024 * 1024;

      if (!validFileTypes.includes(file.type)) {
        this.imageError = 'Only JPEG, PNG, or GIF files are allowed.';
        this.postForm.get('image')?.setErrors({ invalidFileType: true });
        return;
      }

      if (file.size > maxFileSize) {
        this.imageError = 'File size must not exceed 5MB.';
        this.postForm.get('image')?.setErrors({ fileTooLarge: true });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.newPostImage = e.target?.result || null;
        this.postForm.patchValue({ image: this.newPostImage });
        this.selectedImage = file;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageError = 'Please select a valid image file.';
    }
  }

  uploadNewPost(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('caption', this.postForm.get('caption')?.value);
      formData.append('image', this.selectedImage);
      this._postService.uploadPost(formData).subscribe((res) => {
        if (res.success) {
          this._toastService.showToast(res.message, 'success');
          this.closeUploadModal();
        }
      });
      this.newPostImage = null;
      this.postForm.reset();
    }
  }

  get captionError(): string {
    const captionControl = this.postForm.get('caption');
    if (captionControl?.hasError('required')) {
      return 'Caption is required.';
    }
    if (captionControl?.hasError('minLength')) {
      return captionControl.getError('minLength');
    }
    if (captionControl?.hasError('maxLength')) {
      return captionControl.getError('maxLength');
    }
    if (captionControl?.hasError('invalidCaption')) {
      return captionControl.getError('invalidCaption');
    }
    return '';
  }
  get captionControl() {
    return this.postForm.get('caption');
  }
}
