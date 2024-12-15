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
  newPostImages: { file: File; preview: string | ArrayBuffer }[] = [];
  imageErrors: string[] = [];
  postForm!: FormGroup;
  MAX_IMAGES = 5;

  constructor(
    private readonly _postService: PostService,
    private readonly _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this._postService.fetchPosts().subscribe((res) => {
      console.log('ppppost', res);
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
    this.newPostImages = [];
    this.imageErrors = [];
    this.postForm = new FormGroup({
      caption: new FormControl('', [validateCaption()]),
      images: new FormControl(
        [],
        [Validators.required, Validators.maxLength(this.MAX_IMAGES)]
      ),
    });
  }

  closeUploadModal(): void {
    this.isUploadModalOpen = false;
    this.newPostImages = [];
    this.imageErrors = [];
  }

  onFilesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.imageErrors = [];

    if (files) {
      const fileList = Array.from(files);
      const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxFileSize = 5 * 1024 * 1024; // 5MB

      // Check if total number of images exceeds limit
      if (this.newPostImages.length + fileList.length > this.MAX_IMAGES) {
        this.imageErrors.push(
          `Maximum ${this.MAX_IMAGES} images allowed per post.`
        );
        return;
      }

      fileList.forEach((file) => {
        // Validate each file
        if (!validFileTypes.includes(file.type)) {
          this.imageErrors.push(
            `${file.name}: Only JPEG, PNG, or GIF files are allowed.`
          );
          return;
        }

        if (file.size > maxFileSize) {
          this.imageErrors.push(`${file.name}: File size must not exceed 5MB.`);
          return;
        }

        // Create file reader for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newPostImages.push({
            file: file,
            preview: e.target?.result || '',
          });

          // Update form control with files
          this.postForm.patchValue({
            images: this.newPostImages.map((img) => img.file),
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.newPostImages.splice(index, 1);
    this.postForm.patchValue({
      images: this.newPostImages.map((img) => img.file),
    });
  }

  uploadNewPost(): void {
    if (this.postForm.valid && this.newPostImages.length > 0) {
      const formData = new FormData();
      formData.append('caption', this.postForm.get('caption')?.value);

      // Append multiple images
      this.newPostImages.forEach((imageObj, index) => {
        formData.append('images', imageObj.file, `image_${index}`);
      });

      this._postService.uploadPost(formData).subscribe((res) => {
        if (res.success) {
          this._toastService.showToast(res.message, 'success');
          this.fetchPosts();
          this.closeUploadModal();
        }
      });
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
