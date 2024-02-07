import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Platform, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote,
   IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonAvatar, IonImg, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, logIn, documentText, checkmarkCircle, images, camera, arrowUndoCircle, informationCircle, chatboxEllipses, navigate } from 'ionicons/icons';
import { AuthService } from './auth/services/auth.service';
import { User } from './auth/interfaces/user';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { close} from 'ionicons/icons';
import { add} from 'ionicons/icons';
import { menu} from 'ionicons/icons';
import {trash} from 'ionicons/icons';
import {eye}from 'ionicons/icons';
import { exit } from 'ionicons/icons';
import { heart } from 'ionicons/icons';
// import { hear-half} from 'ionicons/icons';
import { NavController} from '@ionic/angular/standalone';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, IonRouterLink, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, 
    IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonAvatar, IonImg ],
})
export class AppComponent {
  user: User | null = null;

  #authService = inject(AuthService);
  #platform = inject(Platform);
  #nav = inject(NavController);


  public appPages = [
    { title: 'Home', url: '/posts', icon: 'home' },
    { title: 'Add posts', url: '/posts/add', icon: 'add' },
    { title: 'Profile', url: '/profile/me', icon: 'eye' },

  ];
  
  constructor() {
    addIcons({ home, logIn, documentText, checkmarkCircle, images, camera, arrowUndoCircle,add,close,menu,trash,eye,exit,heart,informationCircle,chatboxEllipses,navigate});

    effect(() => {
      if (this.#authService.logged()) {
        this.#authService.getProfile().subscribe((user) => (this.user = user));
      } else {
        this.user = null;
      }
    });

    this.initializeApp();
  }

  async initializeApp() {
    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();
      StatusBar.setBackgroundColor({ color: '#3880ff' });
      StatusBar.setStyle({ style: Style.Dark });
      GoogleAuth.initialize();
    }
  }

  async logout() {
    await this.#authService.logout();
    this.#nav.navigateRoot(['/auth/login']);
  }
}