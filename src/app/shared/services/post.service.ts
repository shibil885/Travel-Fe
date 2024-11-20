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
    return this._http.get<{ success: boolean; message: string; posts: IPost[] }>(
      `${this._api}/user`,
      { withCredentials: true }
    );
  }
}
