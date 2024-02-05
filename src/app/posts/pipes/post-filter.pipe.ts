import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/posts'

@Pipe({  name: 'postFilter',  standalone: true,})

export class PostFilterPipe implements PipeTransform {

    transform(posts: Post[], search: string): Post[] {
      if (!search) return posts;
      return posts.filter((p) =>
        p.title && p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
}