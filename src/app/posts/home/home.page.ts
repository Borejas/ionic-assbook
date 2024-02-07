import { Component, Input, OnInit, inject, numberAttribute } from '@angular/core';
import { NavController, ActionSheetController, IonRouterLink, IonHeader, IonToolbar, 
  IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab,
   IonFabButton, IonIcon, IonList, IonItem, 
   IonThumbnail,IonLabel, IonButton, IonCard, IonImg, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCol ,IonAvatar ,IonSearchbar } from '@ionic/angular/standalone';
import { PostService } from '../services/posts.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Post } from '../interfaces/posts';
import { CommonModule } from '@angular/common';
import { thumbsUp,thumbsDown, create } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { PostFilterPipe } from '../pipes/post-filter.pipe';
import { FormsModule } from '@angular/forms';
import { PostItemPage } from "../post-item/post-item.page";
import { User } from '../../auth/interfaces/user';
import { ServicesProfileService } from 'src/app/profile/services/services-profile.service';

@Component({
    selector: 'home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [IonSearchbar, IonAvatar, CurrencyPipe, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton,
        IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon,
        IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonCard, IonImg, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCol, CommonModule,
        PostFilterPipe, FormsModule, PostItemPage]
})

export class HomePage  {

  constructor() {
    addIcons({ thumbsUp,thumbsDown,create});
  }
  
  posts: Post[] = [];
  searchPost:string = '';
  #PostService = inject(PostService);
  user!: User | null;
  id!: number;
  #profileService = inject(ServicesProfileService);

  @Input({ transform: numberAttribute }) set creator(creator: number) {
    console.log(creator);
    if (creator ) {
      this.id = creator;

      this.#profileService.getProfile(this.id).subscribe({
        next: (user) => {
          this.user = user.user;
        },
        error: (error) => console.error(error),
      });

      this.#PostService.getUserPosts(this.id).subscribe({
        next: (posts) => {
          this.posts = posts;
        },
        error: (error) => console.error(error),
      });

    } else {
      this.user=null;
      this.#PostService.getPosts().subscribe({
        next: (posts) => {
          this.posts = posts;
        },
        error: (error) => console.error(error),
      });
    }
  }

  reloadPosts(refresher: IonRefresher) {
    this.#PostService
    .getPosts()
    .subscribe((posts) => {
      this.posts = posts;
      refresher.complete();
    });
  }

}