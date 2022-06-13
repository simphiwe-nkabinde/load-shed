import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EskomApiService } from '../../services/eskom-api.service';
import { SearchSuburb } from 'eskom-loadshedding-api';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
})
export class AreaPage implements OnInit {
  areas = [];
  public searchField: FormControl;
  constructor(
    private alertCtrl: AlertController,
    private eskomApi: EskomApiService,
    private route: Router
  ) {
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    this.searchVolume();
  }

  searchVolume() {
    if (this.searchField.value) {
      this.eskomApi.searchSuburbs(this.searchField.value).subscribe((res) => {
        this.areas = [...res];
        // console.log('Im here 📍', this.areas);
      });
    } else {
      this.areas = [];
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: `Can't Find Your Area?`,
      message: `Try using the Community to ask your neighbours for help`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'OK',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertAddAreaConfirm(id: number, name: string, province: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: `Add area`,
      message: `Do you want to add ${name} (${province}) to your areas?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'OK',
          id: 'confirm-button',
          handler: () => {
            // console.log(this.areas.filter((area) => area.Id === id));
            const storedLocation = JSON.parse(localStorage.getItem('location'));
            const places = [
              ...storedLocation,
              ...this.areas.filter((area) => area.Id === id),
            ];
            // console.log('places here 📍:', places);
            localStorage.setItem('location', JSON.stringify(places));
            this.route.navigateByUrl('/');
          },
        },
      ],
    });

    await alert.present();
  }

  sayHi() {
    console.log('Hello from ');
  }
}

interface Area {
  name: string;
  stage: number;
}

interface FoodItem {
  name: string;
}
