import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, NavController, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonList, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon]
})
export class LoginPage implements OnInit {
  
  user: User = {
    name: '',
    password: '',
    email: '',
    avatar: '',
    lat: 0,
    lng: 0
  };

  email = '';
  password = '';

  ngOnInit() {
    this.getLocation();
  }

  #authService = inject(AuthService);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);

  login() {
    this.#authService
      .login(this.email, this.password)
      .subscribe({
        next: () => this.#navCtrl.navigateRoot(['/posts']),
        error: async (error) => {
          (
            await this.#alertCtrl.create({
              header: 'Login error',
              message: 'Incorrect email and/or password',
              buttons: ['Ok'],
            })
          ).present();
        },
      });
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.user.lat = position.coords.latitude;
        this.user.lng = position.coords.longitude;
      });
    }else {
      console.log('Geolocation is not available');
    }
  }


}
