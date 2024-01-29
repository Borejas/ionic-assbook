import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastController, NavController, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
   IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel } from '@ionic/angular/standalone';
import { PostService } from '../services/posts.service';
import { Post } from '../interfaces/posts';
import { RouterLink } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'product-form',
  templateUrl: './posts-form.page.html',
  styleUrls: ['./posts-form.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
     IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel]
})
export class PostsFormPage {
  newPost: Post = {
    description: '',
    image: '',
    lat: 0,
    lng: 0,
    mood: 0,
    totalLikes: 0,
    mine: false,
    likes: null
  };

  #postsService = inject(PostService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController)

  addProduct() {
    this.#postsService.addPosts(this.newPost).subscribe({
      next: async prod => {
        (await this.#toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Product added succesfully',
          color: 'success'
        })).present();
        this.#nav.navigateRoot(['/posts']);
      },
      error: async error => (await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error adding product'
      })).present()
    });

  }

  // formRequired(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const title = control.get('title')?.value;
  //     const description = control.get('description')?.value;
  //     const image = control.get('image')?.value;

  //     if (!title && !description && !image) {
  //       return { required: true };
  //     } else {
  //       return null;
  //     }
  //   };
  // }

  async takePhoto() {;
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newPost.image = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.newPost.image = photo.dataUrl as string;
  }
}