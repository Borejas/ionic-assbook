import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastController, NavController, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
   IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonSelectOption ,IonTabs ,
   IonTabBar ,IonTabButton ,IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { PostService } from '../services/posts.service';
import { PostInsert } from '../interfaces/posts';
import { Router, RouterLink } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Coordinates } from 'src/app/bingmaps/interfaces/coordinates';
import { GeolocationPage } from "../../geoLocation/geoLocation.page";
import { BmMapDirective } from "../../bingmaps/bm-map.directive";
import { BmMarkerDirective } from "../../bingmaps/bm-marker.directive";
import { BmAutosuggestDirective } from "../../bingmaps/bm-autosuggest.directive";

@Component({
    selector: 'product-form',
    templateUrl: './posts-form.page.html',
    styleUrls: ['./posts-form.page.scss'],
    standalone: true,
    imports: [IonSegment, IonTabButton, IonTabBar, IonTabs, FormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
        IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonSelectOption, GeolocationPage,
        BmMapDirective, BmMarkerDirective, IonSegmentButton, BmAutosuggestDirective]
})
export class PostsFormPage implements OnInit{
  #postsService = inject(PostService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController)
  selectedMediaType: string = 'photo';
  cords!: Coordinates;
  iditPost: boolean = false;
  @Input() id!: number;
  saved: boolean = false;
  autoSuggest = false;

  newPost: PostInsert = {
    title: '',
    description: '',
    mood: 0,
    image: '',
    likes: null,    
  };
 
  ngOnInit(): void {
    this.getLocation(); 

    if (this.id) {
      this.iditPost = true;
      this.#postsService.getPost(this.id).subscribe({
        next: post => {
          this.newPost.title = post.title;
          this.newPost.description = post.description;
          this.newPost.mood = post.mood;
          this.newPost.image = post.image;
          this.newPost.place = post.place;
          this.newPost.lat = post.lat;
          this.newPost.lng = post.lng;
        }
      });
    }
  }
  
  addPosts() {

    let Post: PostInsert;

    if (this.selectedMediaType === 'photo') {     
     
      Post = {
        title: this.newPost.title,
        description: this.newPost.description,
        mood: this.newPost.mood,
        image: this.newPost.image,
      };


    }else {
     
      Post = {
        title: this.newPost.title,
        description: this.newPost.description,
        mood: this.newPost.mood,
        place: this.newPost.place,
        lat: this.newPost.lat,
        lng: this.newPost.lng,
      };
    }

    if (this.iditPost === true) {
      this.#postsService.updatePost(this.id,Post).subscribe({
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
    } else {      
      this.#postsService.addPosts(Post).subscribe({
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
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.newPost.lat = this.cords.latitude;
        this.newPost.lng = this.cords.longitude;        
      });
    }else {
      console.log('Geolocation is not available');
    }
  }
  
  ChangeMood(event: Event):void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.newPost.mood = Number(selectedValue);
  }

  @ViewChild('search')
  set search(search: IonInput) {
     if(search) { 
       search.getInputElement().then(s => { 
         s.id = 'search'; 
         this.autoSuggest = true;
      });
    } else { 
      this.autoSuggest = false;
    }
  }

  moveMap(coords: Coordinates) {
    this.cords = coords;
  }

  segmentChanged(event: CustomEvent): void {
    this.selectedMediaType = event.detail.value;
  }

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