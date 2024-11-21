import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IPost } from '../../../interfaces/post.interface';
import { PostService } from '../../../shared/services/post.service';
import { IsLikedPipe } from '../../../shared/pipes/is-liked.pipe';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    ReactiveFormsModule,
    CommonModule,
    IsLikedPipe,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts: IPost[] = [];
  @ViewChild('like') likeIcon!: ElementRef;
  @ViewChild('likeCount') likeCount!: ElementRef;
  currentUserId!: string;

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
    const liked = post.likes.some((like) => like.userId === this.currentUserId);
    if (liked) {
      this._postService.removeLike(postId).subscribe((res) => {
        if (res.success) {
          this.fetchPosts()
          this.likeIcon.nativeElement.style.color = 'black';

          this.likeCount
        }
      });
    } else {
      this._postService.addLike(postId).subscribe((res) => {
        if (res.success) {
          this.fetchPosts()
          this.likeIcon.nativeElement.style.color = 'red';
        }
      });
    }
  }

  addComment(post: string, commentText: string) {}
}
