import { Component, Input, inject, signal } from '@angular/core';
  import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
  import { PostService } from '../services/posts.service';
  import { Post } from '../interfaces/posts';

  @Component({
    selector: 'product-detail',
    templateUrl: './posts-detail.page.html',
    styleUrls: ['./posts-detail.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
  })
  export class PostsDetailPage  {
    @Input() id!: number;
    post = signal<Post|null>(null);

    #PostService = inject(PostService);

    constructor() { }

    ionViewWillEnter() {
      this.#PostService.getPost(this.id).subscribe(
        p => this.post.set(p)
      )
    }
  }