import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EskomApiService } from '../../services/eskom-api.service';

@Component({
  selector: 'app-area-stages',
  templateUrl: './area-stages.page.html',
  styleUrls: ['./area-stages.page.scss'],
})
export class AreaStagesPage implements OnInit {
  weekDates: number[];
  suburb: any[];
  storedLocation: any[];
  location: Location;
  noLoadshedding: string;
  placeId: number;
  constructor(
    private alertCtrl: AlertController,
    private eskomApi: EskomApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.weekDates = this.currentWeekDates();
    this.fetchAreaStages();
    this.getSuburb();
  }

  getSuburb() {
    this.storedLocation = localStorage.getItem('location')
      ? JSON.parse(localStorage.getItem('location'))
      : [];
    this.location = this.storedLocation.filter(
      (place) => place.Id === this.placeId
    )[0];
  }

  fetchAreaStages() {
    this.placeId = ~~this.route.snapshot.paramMap.get('id');

    this.eskomApi.getFullSuburbSchedule(this.placeId).subscribe((res) => {
      if (res.err) {
        //handle error message
        console.log(res.err);
        this.noLoadshedding = res.err;
      } else {
        console.log(res);
        this.suburb = [...res];
        console.log('suburb here: ', this.suburb);
      }
    });
  }

  //return  [Date] [monday, ..., sunday]
  currentWeekDates() {
    let weekDateArray = [];
    const currentWeekday = new Date().getDay();
    let remaining = 7 - currentWeekday;

    // count forwards until sunday
    for (let i = 0; i <= remaining; i++) {
      let today = new Date();
      let nextDay = new Date();
      nextDay.setDate(today.getDate() + i);
      weekDateArray.push(nextDay);
    }
    return weekDateArray;
  }

  toDate(date: any) {
    return date.toLocaleDateString()
  }
  toDay(date: any): string {
    switch (new Date(date).getDay()) {
      case 0:
        return "Sunday";
        break;
      case 1:
        return "Monday";
        break;
      case 2:
        return "Tuesday";
        break;
      case 3:
        return "Wednesday";
        break;
      case 4:
        return "Thursday";
        break;
      case 5:
        return "Friday";
        break;
      case 6:
        return "Saturday";
    }
  }


  removeAreaFromStorage() {
    const id = this.route.snapshot.paramMap.get('id');
    let listJson = localStorage.getItem('location');
    let listArray = JSON.parse(listJson);

    let index = listArray.findIndex((item) => {
      return item.Id == id;
    });

    listArray.splice(index, 1);
    localStorage.setItem('location', JSON.stringify(listArray));

    window.dispatchEvent(new Event('storage'));
    this.router.navigate(['/landing']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: `Delete Area`,
      message: `Are you sure you want to delete this area?`,
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
            this.removeAreaFromStorage();
          },
        },
      ],
    });

    await alert.present();
  }
}

interface Location {
  Id: number;
  MunicipalityName: string;
  Name: string;
  ProvinceName: string;
  Total: number;
}
