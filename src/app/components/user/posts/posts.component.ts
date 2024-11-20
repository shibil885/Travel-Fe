import { Component } from '@angular/core';
import { HeaderSidebarComponent } from '../header-and-side-bar/header-and-side-bar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    SearchComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts: Post[] = [
    {
      id: 1,
      username: 'john_doe',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      imageUrl: 'https://picsum.photos/id/1018/1000/600',
      caption: 'Beautiful day in the mountains! 🏔️',
      likes: 120,
      comments: [
        { id: 1, username: 'jane_smith', text: 'Looks amazing!' },
        { id: 2, username: 'travel_enthusiast', text: 'I wish I was there!' },
      ],
      createdAt: new Date('2023-05-15T10:30:00'),
    },
    {
      id: 2,
      username: 'foodie_adventures',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      imageUrl: 'https://picsum.photos/id/292/1000/600',
      caption: 'Delicious homemade pasta! 🍝 Recipe in bio.',
      likes: 89,
      comments: [
        { id: 3, username: 'chef_mike', text: 'Great plating!' },
        { id: 4, username: 'pasta_lover', text: 'Yum! I need to try this.' },
      ],
      createdAt: new Date('2023-05-14T18:45:00'),
    },
  ];

  newPostForm: FormGroup;
  showNewPostForm = false;

  constructor(private fb: FormBuilder) {
    this.newPostForm = this.fb.group({
      imageUrl: ['', Validators.required],
      caption: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  toggleNewPostForm(): void {
    this.showNewPostForm = !this.showNewPostForm;
  }

  addNewPost(): void {
    if (this.newPostForm.valid) {
      const newPost: Post = {
        id: this.posts.length + 1,
        username: 'current_user', // In a real app, this would be the logged-in user
        userAvatar: 'https://i.pravatar.cc/150?img=8',
        imageUrl: this.newPostForm.get('imageUrl')?.value,
        caption: this.newPostForm.get('caption')?.value,
        likes: 0,
        comments: [],
        createdAt: new Date(),
      };
      this.posts.unshift(newPost);
      this.newPostForm.reset();
      this.showNewPostForm = false;
    }
  }

  likePost(post: Post): void {
    post.likes++;
  }

  addComment(post: Post, commentText: string): void {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: post.comments.length + 1,
        username: 'current_user', // In a real app, this would be the logged-in user
        text: commentText.trim(),
      };
      post.comments.push(newComment);
    }
  }
}
interface Post {
  id: number;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

interface Comment {
  id: number;
  username: string;
  text: string;
}
