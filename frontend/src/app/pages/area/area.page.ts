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
  // areas = [
  //   { name: 'Joburg', stage: 5 },
  //   { name: 'Pretoria', stage: 3 },
  // ];
  areas = [];
  public searchField: FormControl;
  public areaList$: Observable<Area[]>;
  constructor(
    private alertCtrl: AlertController,
    private eskomApi: EskomApiService
  ) {
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    // we need to fetch all the areas from API
    // const areaList$ = collectionData(query(collection(this.firestore, 'foodList')));
    this.eskomApi.searchSuburbs('magudu').subscribe((res) => {
      console.log('look 👀:', res);
      this.areas = [...res];
    });

    const areaList$ = [];

    console.log('data here: ', this.areas);

    this.areaList$ = combineLatest([areaList$, searchTerm$]).pipe(
      map(([areaList, searchTerm]) =>
        areaList.filter(
          (areaItem) =>
            searchTerm === '' ||
            areaItem.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
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
