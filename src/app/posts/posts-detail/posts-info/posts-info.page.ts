import { Component, inject } from '@angular/core';
import { AlertController, NavController ,IonHeader, IonToolbar, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonLabel, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { PostService } from '../../services/posts.service';
import { PostsDetailPage } from '../posts-detail.page';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-info',
  templateUrl: './posts-info.page.html',
  styleUrls: ['./posts-info.page.scss'],
  standalone: true,
  imports: [CurrencyPipe ,IonHeader, IonToolbar, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonLabel, IonItem, IonAvatar],
})
export class PostsInfoPage {
  post = inject(PostsDetailPage).post; // Obtenemos signal de la página padre

  #alertCtrl = inject(AlertController);
  #PostService = inject(PostService);
  #nav = inject(NavController);

  async delete() {
    const alert = await this.#alertCtrl.create({
      header: 'Delete product',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.#PostService
              .deletePost(this.post()!.id!)
              .subscribe(() => this.#nav.navigateBack(['/posts']));
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    alert.present();
  }
}