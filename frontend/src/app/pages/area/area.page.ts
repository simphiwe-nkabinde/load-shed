import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EskomApiService } from '../../services/eskom-api.service';

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
    private eskomApi: EskomApiService
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

  sayHi() {
    console.log('Hello from search');
  }
}

interface Area {
  name: string;
  stage: number;
}

interface FoodItem {
  name: string;
}
