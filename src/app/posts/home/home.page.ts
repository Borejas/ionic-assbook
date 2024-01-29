import { Component, OnInit, inject } from '@angular/core';
import { NavController, ActionSheetController, IonRouterLink, IonHeader, IonToolbar, 
  IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab,
   IonFabButton, IonIcon, IonList, IonItem, 
   IonThumbnail,IonLabel, IonButton, IonCard, IonImg, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCol ,IonAvatar ,IonSearchbar } from '@ionic/angular/standalone';
import { PostService } from '../services/posts.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Post } from '../interfaces/posts';
import { CommonModule } from '@angular/common';
import { thumbsUp,thumbsDown } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonAvatar, CurrencyPipe, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton,
     IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon,
      IonList, IonItem, IonThumbnail,IonLabel, IonButton,IonCard,IonImg,IonCardTitle,IonCardHeader,IonCardSubtitle,IonCol, CommonModule]
})

export class HomePage {

  constructor() {
    addIcons({ thumbsUp,thumbsDown});
  }
  
  post: Post[] = [];
  searchPost = '';

  #PostService = inject(PostService);
  #navController = inject(NavController);
  #actionSheetCtrl =inject(ActionSheetController);

  ionViewWillEnter() {
    this.#PostService
      .getPosts()
      .subscribe((posts) => (this.post = posts));
  }

  reloadPosts(refresher: IonRefresher) {
    this.#PostService
    .getPosts()
    .subscribe((posts) => {
      this.post = posts;
      refresher.complete();
    });
  }

  async showOptions(post: Post) {
    const actSheet = await this.#actionSheetCtrl.create({
      header: post.description,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.#PostService
              .deletePost(post.id!)
              .subscribe(() =>
                this.post.splice(this.post.indexOf(post), 1)
              );
          },
        },
        {
          text: 'See details',
          icon: 'eye',
          handler: () => {
            this.#navController.navigateForward(['/posts', post.id]);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    actSheet.present();
  }

 


}