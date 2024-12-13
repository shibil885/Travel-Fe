import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IPost } from '../../../interfaces/post.interface';
import { PostService } from '../../../shared/services/post.service';
import { IsLikedPipe } from '../../../shared/pipes/is-liked.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [HeaderSidebarComponent, IsLikedPipe, CommonModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  posts: IPost[] = [];
  @ViewChild('like') likeIcon!: ElementRef;
  currentUserId!: string;
  commentText: string = '';
  selectedPost: IPost | null = null;
  currentImageIndex: number = 0;

  constructor(
    private readonly _postService: PostService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this._postService.fetchAllPosts().subscribe((res) => {
      if (res.success) {
        this.posts = res.posts;
        this.currentUserId = res.userId;
        this.cdr.markForCheck();
      }
    });
  }

  updateLike(postId: string, post: IPost) {
    const liked = post.likes.some((like) => like.userId === this.currentUserId);
    if (liked) {
      this._postService.removeLike(postId).subscribe((res) => {
        if (res.success) {
          this.fetchPosts();
        }
      });
    } else {
      this._postService.addLike(postId).subscribe((res) => {
        if (res.success) {
          this.fetchPosts();
        }
      });
    }
  }

  addComment(postId: string) {
    if (this.commentText.trim()) {
      this._postService
        .addComment(postId, this.commentText)
        .subscribe((res) => {
          if (res.success) {
            this.commentText = '';
            this.fetchPosts();
          }
        });
    }
  }

  openPostModal(post: IPost) {
    this.selectedPost = post;
    this.currentImageIndex = 0;
  }

  closePostModal() {
    this.selectedPost = null;
    this.currentImageIndex = 0;
  }

  nextImage() {
    if (
      this.selectedPost &&
      this.currentImageIndex < this.selectedPost.imageUrls.length - 1
    ) {
      this.currentImageIndex++;
    }
  }

  prevImage() {
    if (this.selectedPost && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
}
