import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPost } from '../../interfaces/post.interface';
import { environment } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly _BASE_URL = environment.apiUrl;
  private readonly _api = `${this._BASE_URL}/posts`;
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
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.get<{
      success: boolean;
      message: string;
      posts: IPost[];
      userId: string;
    }>(`${this._api}`, { headers, withCredentials: true });
  }

  addLike(postId: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/like/${postId}`,
      {},
      { headers, withCredentials: true }
    );
  }

  removeLike(postId: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/unlike/${postId}`,
      {},
      { headers, withCredentials: true }
    );
  }
  addComment(postId: string, comment: string) {
    const headers = new HttpHeaders().set('skip-loading', 'true');
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/addComment/${postId}`,
      { comment },
      { headers, withCredentials: true }
    );
  }
}
