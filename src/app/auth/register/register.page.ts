import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonRouterLink, ToastController, NavController, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput,
   IonIcon, IonImg, IonButton, IonGrid, IonRow, IonCol, IonLabel } from '@ionic/angular/standalone';
import { User } from '../interfaces/user';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';
import { ValueEqualsDirective } from 'src/app/validators/value-equals.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ FormsModule, RouterLink, IonRouterLink, ValueEqualsDirective, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
     IonItem, IonInput, IonIcon, IonImg, IonButton, IonGrid, IonRow, IonCol, IonLabel],
})
export class RegisterPage implements OnInit{
  async ngOnInit() {
    await this.getLocation();
    // console.log('Latitude', this.user.latitude);
    // console.log('Longitude', this.user.longitude);
  }

  user: User = {
    name: '',
    password: '',
    email: '',
    avatar: '',
    lat: 0,
    lng: 0
  };
  password2 = '';

  #authService = inject(AuthService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController); 

  register() {
    this.#authService.register(this.user).subscribe(
      async () => {
        (await this.#toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: 'User registered!'
        })).present();
        this.#nav.navigateRoot(['/auth/login']);
      }
    );
  }

  async getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.user.lat = position.coords.latitude;
      this.user.lng = position.coords.longitude;
      console.log('Latitude', this.user.lat);
      console.log('Longitude', this.user.lng);
    });
  }

  async takePhoto() {;
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });
    this.user.avatar = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });
    this.user.avatar = photo.dataUrl as string;
  }
}