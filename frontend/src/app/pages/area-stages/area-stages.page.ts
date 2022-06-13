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
    this.weekDates = this.currentweekDates()
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

  //return [Date] [monday, ..., sunday]
  currentweekDates(): number[] {
    let weekDateArray: number[]
    let currentWeekday = new Date().getDay()
    weekDateArray[currentWeekday] = Date.now()

    // count forward until sunday
    for (let i = currentWeekday; i < 7; i++) {
      weekDateArray[i] = new Date().setDate(new Date().getDate()+i)
    }

    // count bckwards until monday
    for (let i = currentWeekday - 1; i >= 0; i--) {
      weekDateArray[i] = new Date().setDate(new Date().getDate()-i)
    }
    return weekDateArray;
  }

}

interface Location {
  Id: number;
  MunicipalityName: string;
  Name: string;
  ProvinceName: string;
  Total: number
}
