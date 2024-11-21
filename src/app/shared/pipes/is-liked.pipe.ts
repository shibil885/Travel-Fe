import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';

@Pipe({
  name: 'isLiked',
  standalone: true,
  pure: false,
})
export class IsLikedPipe implements PipeTransform {
  transform(post: IPost, userId: string): boolean {
    return post.likes.some((like) => like.userId === userId);
  }
}
