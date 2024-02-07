import { Component, Input, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule, NavController } from '@ionic/angular';
import { PostService } from '../services/posts.service';
import { Post } from '../interfaces/posts';
import { RouterLink } from '@angular/router';
import { IonAvatar, IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonImg, IonLabel, ToastController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.page.html',
  styleUrls: ['./post-item.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,RouterLink,IonCard, IonImg, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCol, CommonModule,
     FormsModule, PostItemPage,IonAvatar,IonButtons,IonIcon,IonLabel,IonButton]
})
export class PostItemPage  implements OnInit  {
 
  @Input() post!: Post;
  @Input() id!: number;
  numLikes!: number;

  #PostService = inject(PostService);
  #navController = inject(NavController);
  #actionSheetCtrl =inject(ActionSheetController);
  #toastCtrl = inject(ToastController);
  

  ngOnInit(){
    this.numLikes = this.post.totalLikes;
  }

  thumbsUp(post: Post) {
    if (post.likes == true) {
      this.#PostService.deleteVote(post.id!).subscribe({
        next: (resp) => {
          post.likes = null;
          this.numLikes = resp;
        },
        error: (error) => console.error(error),
      });
    } else {
      this.#PostService.addVote(post.id!, true).subscribe({
        next: (resp) => {
          post.likes = true;
          this.numLikes = resp;
        },
        error: (error) => console.error(error),
      });
    }
  }

  thumbsDown(post: Post) {
    if (post.likes == false) {
      this.#PostService.deleteVote(post.id!).subscribe({
        next: (resp) => {
          post.likes = null;
          this.numLikes = resp;
        },
        error: (error) => console.error(error),
      });
    } else {
      this.#PostService.addVote(post.id!, false).subscribe({
        next: (resp) => {
          post.likes = false;
          this.numLikes = resp;
        },
        error: (error) => console.error(error),
      });
    }
  }

  delete() {
    this.#PostService.deletePost(this.post.id!).subscribe({
      next: async () => {
       (await this.#toastCtrl.create({
          message: 'Post deleted successfully',
          duration: 2000,
        })).present();
        this.#navController.navigateBack('/posts');        
      }
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
          cssClass: this.post.mine ? '' : 'd-none',
          handler: () => {
            this.#PostService
              .deletePost(post.id!)
              .subscribe(() =>
                this.#PostService.deletePost(this.post.id!).subscribe(() => this.#navController.navigateRoot('/posts'))
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
          text: 'Edit',
          icon: 'create',
          cssClass: this.post.mine ? '' : 'd-none',
          handler: () => {
            this.#navController.navigateForward(['/posts/'+ post.id + '/edit']);
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
