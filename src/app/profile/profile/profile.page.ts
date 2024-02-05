import { CommonModule } from '@angular/common';
import {
  AlertController,
  IonicModule,
} from '@ionic/angular';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicesProfileService } from '../services/services-profile.service';
import {
  UserAvatarEdit,
  UserPasswordEdit,
  UserProfileEdit,
} from '../../auth/interfaces/user';
import { UserResponse } from '../../posts/interfaces/responses';
import { Coordinates } from 'src/app/bingmaps/interfaces/coordinates';
import { BmMapDirective } from '../../bingmaps/bm-map.directive';
import { BmMarkerDirective } from '../../bingmaps/bm-marker.directive';
import { BmAutosuggestDirective } from '../../bingmaps/bm-autosuggest.directive';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,FormsModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink,
     BmMapDirective, BmMarkerDirective, BmAutosuggestDirective,
  ],
})
export class ProfilePage implements OnInit {
  @Input() id!: number;
  #fb = inject(NonNullableFormBuilder);
  profileForm: boolean = false;
  passwordForm2: boolean = false;
  #router = inject(Router);
  #serviceService = inject(ServicesProfileService);
  profile: boolean = false;
  saved: boolean = false;
  cords!: Coordinates;
  #alertCtrl = inject(AlertController);
  user!: UserResponse;

  onAvatarChange(event: Event): void {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        const avatar: UserAvatarEdit = {
          avatar: reader.result as string,
        };

        this.#serviceService.saveAvatar(avatar).subscribe(
          () => {
            this.#router.navigate(['/profile']);
            location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
      };
    }
  }

  ngOnInit() {
    if (!this.id) {
      this.#serviceService.getMyUser().subscribe({
        next: (user) => {
          this.user = user;
          this.profile = true;
          this.cords = {
            latitude: user.user.lat,
            longitude: user.user.lng,
          };
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.#serviceService.getProfile(this.id).subscribe({
        next: (user) => {
          this.user = user;
          this.cords = {
            latitude: user.user.lat,
            longitude: user.user.lng,
          };
          this.#serviceService.getMyUser().subscribe({
            next: (myUser) => {
              if (myUser.user.id == user.user.id) {
                this.profile = true;
              } else {
                this.profile = false;
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  moveMap(coords: Coordinates) {
    this.cords = coords;
  }

  async passwordChange() {
    const alert = await this.#alertCtrl.create({
      header: 'Cambio de contraseña',
      inputs: [
        {
          name: 'contrasena',
          type: 'password',
          placeholder: 'Pon tu contraseña',
          attributes: {
            required: true,
          },
        },
        {
          name: 'contrasena2',
          type: 'password',
          placeholder: 'Repite tu contraseña',
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: 'Add',
          role: 'ok',
        },
        {
          role: 'cancel',
          text: 'Cancel',
        },
      ],
    });
    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      const password = result.data.values.contrasena;
      const password2 = result.data.values.contrasena2;

      if (password?.toUpperCase() === password2?.toUpperCase()) {
        const user: UserPasswordEdit = {
          password: password,
        };

        this.#serviceService.savePassword(user).subscribe(
          () => {
            this.#router.navigate(['/profile']);
            location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  async ProfileChange() {
    const alert = await this.#alertCtrl.create({
      header: 'Cambio nombre y email',
      inputs: [
        {
          name: 'Nombre',
          type: 'text',
          placeholder: 'Nombre',
        },
        {
          name: 'Email',
          type: 'text',
          placeholder: 'Email',
        },
      ],
      buttons: [
        {
          text: 'Add',
          role: 'ok',
        },
        {
          role: 'cancel',
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      const email = result.data.values.Email;
      const name = result.data.values.Nombre;

      const user: UserProfileEdit = {
        email: email,
        name: name,
      };

      this.#serviceService.saveProfile(user).subscribe(
        () => {
          this.#router.navigate(['/profile']);
          location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }


}
