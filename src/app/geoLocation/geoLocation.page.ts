//...
import { Geolocation } from '@capacitor/geolocation';
import { BmMapDirective } from '../bingmaps/bm-map.directive';
import { BmMarkerDirective } from '../bingmaps/bm-marker.directive';
import { Coordinates } from '../bingmaps/interfaces/coordinates';
import {  Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [BmMapDirective, BmMarkerDirective, IonContent],
})

export class GeolocationPage implements OnInit {
  coords?: Coordinates;

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });

    this.coords = coordinates.coords;
  }
}