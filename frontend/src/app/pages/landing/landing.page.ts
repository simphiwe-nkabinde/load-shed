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
    // this.areas = localStorage.getItem('areas');
  }

}
