import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/posts'

@Pipe({  name: 'postFilter',  standalone: true,})

export class PostFilterPipe implements PipeTransform {

    transform(products: Post[], search: string): Post[] {
      if (!search) return products;
      return products.filter((p) =>
        p.title!.toLowerCase().includes(search.toLowerCase())
      );
    }
}