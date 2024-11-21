import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
})
export class PostsComponent {
  posts: IPost[] = [];
  @ViewChild('like') likeIcon!: ElementRef;
  currentUserId!: string;
  commentText!: string;
  selectedPost: IPost | null = null;

  constructor(private readonly _postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this._postService.fetchAllPosts().subscribe((res) => {
      if (res.success) {
        this.posts = res.posts;
        this.currentUserId = res.userId;
      }
    });
  }

  updateLike(postId: string, post: IPost) {
    const liked = post.likes.some((like) => {
      return like.userId === this.currentUserId;
    });
    if (liked) {
      this._postService.removeLike(postId).subscribe((res) => {
        if (res.success) {
          this.fetchPosts();
          this.likeIcon.nativeElement.style.color = 'black';
        }
      });
    } else {
      this._postService.addLike(postId).subscribe((res) => {
        if (res.success) {
          this.fetchPosts();
          this.likeIcon.nativeElement.style.color = 'red';
        }
      });
    }
  }

  addComment(postId: string) {
    this._postService.addComment(postId, this.commentText).subscribe((res) => {
      if (res.success) {
        this.selectedPost = null;
        this.commentText = '';
        this.fetchPosts();
      }
    });
  }

  openPostModal(post: IPost) {
    this.selectedPost = post;
  }

  closePostModal() {
    this.selectedPost = null;
  }
}
