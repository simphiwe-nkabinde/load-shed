import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EskomApiService } from '../../services/eskom-api.service';

@Component({
  selector: 'app-area-stages',
  templateUrl: './area-stages.page.html',
  styleUrls: ['./area-stages.page.scss'],
})
export class AreaStagesPage implements OnInit {

  weekDates: number[];
  suburb:any [];
  storedLocation: any[];
  location: Location;
  noLoadshedding: string;
  placeId: number;
  constructor(
    private eskomApi: EskomApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.weekDates = this.currentWeekDates()
    this.fetchAreaStages();
    this.getSuburb();
  }

  getSuburb(){
    this.storedLocation = localStorage.getItem('location') ? JSON.parse(localStorage.getItem('location')) : [];
    this.location = this.storedLocation.filter((place) => place.Id === this.placeId)[0];
  }

  fetchAreaStages(){
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
   currentWeekDates() {
    const dateObj = new Date()
    const date = dateObj.getDate()
    const month = dateObj.getMonth()
    const day = dateObj.getDay()


    const dayStringArray = ['sunday', 'monday', 'tuesday','wednesday','thursday', 'friday', 'saturday']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    let dataArray = [];


    const setDate_ToString = (day, date, month) => `${dayStringArray[day]} / ${date} / ${months[month]}`


    for (let i = 1; i < dayStringArray.length; i++) {
        dataArray.push(setDate_ToString(i, date + i, month))
    }

    return dataArray
}


}

interface Location {
  Id: number;
  MunicipalityName: string;
  Name: string;
  ProvinceName: string;
  Total: number
}
