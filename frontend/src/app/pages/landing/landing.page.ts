import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  areas?: [{Id, Name, MunicipalityName}];

  constructor() {}

  ngOnInit() {
    this.getAllAreas();
  }

  getAllAreas(){
    if(localStorage.getItem('location')){
      console.log(JSON.parse(localStorage.getItem('location')))
      this.areas = JSON.parse(localStorage.getItem('location'));
      window.addEventListener('storage', (e) => {
        return this.areas = JSON.parse(localStorage.getItem('location'));
      })
    }
    
  }
}
