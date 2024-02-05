import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BmMapDirective } from "../../../bingmaps/bm-map.directive";
import { BmMarkerDirective } from "../../../bingmaps/bm-marker.directive";
import { BmAutosuggestDirective } from "../../../bingmaps/bm-autosuggest.directive";
import { Coordinates } from 'src/app/bingmaps/interfaces/coordinates';
import { PostsDetailPage } from '../posts-detail.page';
import { PostService } from '../../services/posts.service';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';
import { IonContent, IonFab, IonFabButton, IonHeader ,IonIcon, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';


@Component({
    selector: 'app-post-location',
    templateUrl: './posts-location.page.html',
    styleUrls: ['./posts-location.page.scss'],
    standalone: true,
    imports: [IonIcon,IonToolbar,IonTitle,IonItem,IonFab,IonFabButton,IonContent, IonHeader, CommonModule, 
      FormsModule, BmMapDirective, BmMarkerDirective, BmAutosuggestDirective]
})
export class PostLocationPage  {
  cords!: Coordinates;
  @Input() id! :number;
  post=inject(PostsDetailPage).post;
  #postsService = inject(PostService);

  constructor() {
    this.cords = {
      latitude: 0,
      longitude: 0
    }
  }

  startNavigation() {
    StartNavigation.launchMapsApp({
      latitude: this.cords.latitude,
      longitude: this.cords.longitude,
      name: 'Directions example',
    });
  }

  ionViewWillEnter(){
    this.#postsService.getPost(this.id).subscribe({
      next: post => {
        this.post.set(post);
        this.cords = {
          latitude:post.lat,
          longitude: post.lng
        }
      }
    });
  }
}
