import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPost } from '../../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly _api = 'http://localhost:3000/posts';
  constructor(private readonly _http: HttpClient) {}

  uploadPost(postFormData: FormData) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/upload`,
      postFormData,
      {
        withCredentials: true,
      }
    );
  }

  fetchPosts() {
    return this._http.get<{
      success: boolean;
      message: string;
      posts: IPost[];
    }>(`${this._api}/user`, { withCredentials: true });
  }

  fetchAllPosts() {
    return this._http.get<{
      success: boolean;
      message: string;
      posts: IPost[];
      userId: string;
    }>(`${this._api}`, { withCredentials: true });
  }

  addLike(postId: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/like/${postId}`,
      {},
      { withCredentials: true }
    );
  }

  removeLike(postId: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/unlike/${postId}`,
      {},
      { withCredentials: true }
    );
  }
  addComment(postId: string, comment: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/addComment/${postId}`,
      { comment },
      { withCredentials: true }
    );
  }
}
