import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  
  areas: [] = [];

  constructor() { }

  ngOnInit() {
    this.getAllAreas();
  }

  getAllAreas(){
    // console.log(JSON.parse(localStorage.getItem('location')))
    console.log(localStorage.getItem('location'))
    this.areas = JSON.parse(localStorage.getItem('location'));
  }

}
