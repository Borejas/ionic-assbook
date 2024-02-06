import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post,PostInsert } from '../interfaces/posts';
import { Comment } from '../interfaces/comment';
import { LikeResponse, PostsResponse, SinglePostResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.#http
      .get<{ posts: Post[] }>('posts')
      .pipe(map((resp) => resp.posts));
  }

  getPost(id: number): Observable<Post> {
    return this.#http
      .get<{ post: Post }>(`posts/${id}`)
      .pipe(map((resp) => resp.post));
  }

  addPosts(post: PostInsert): Observable<Post> {
    return this.#http
      .post<{ post: Post }>('posts', post)
      .pipe(map((resp) => resp.post));
  }

  deletePost(id: number): Observable<void> {
    return this.#http.delete<void>(`posts/${id}`);
  }

  addComment(idPost: number, comment: string): Observable<Comment> {
    return this.#http
      .post<{ comment: Comment }>(`posts/${idPost}/comments`, {
        text: comment,
      })
      .pipe(map((resp) => resp.comment));
  }

  getComments(idPost: number): Observable<Comment[]> {
    return this.#http
      .get<{ comments: Comment[] }>(`posts/${idPost}/comments`)
      .pipe(map((resp) => resp.comments));
  }

  updatePost(idPost: number, post: PostInsert): Observable<Post> {
    return this.#http.put<SinglePostResponse>(`posts/${idPost}`, post).pipe(map((resp) => resp.post));
  }

   // addVote(id:number, likes: boolean): Observable<void>
  addVote(id: number, likes: boolean): Observable<number> {
    const likes2 = {
      likes: likes,
    };
    return this.#http.post<LikeResponse>(`posts/${id}/likes`, likes2).pipe(map((resp) => resp.totalLikes));
  }

  // deleteVote(id:number)
  deleteVote(id: number): Observable<number> {
    return this.#http.delete<LikeResponse>(`posts/${id}/likes`).pipe(map((resp) => resp.totalLikes));
  }

  getUserPosts(id:number): Observable<Post[]> {
    return this.#http.get<PostsResponse>(`posts/user/${id}`).pipe(map((resp) => resp.posts));
  }
  
  
}
