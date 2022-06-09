import { Component, OnInit } from '@angular/core';
import { LoadsheddingStage, Province } from 'eskom-loadshedding-api';
import { EskomApiService } from '../services/eskom-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private eskomApiService: EskomApiService) {}

  ngOnInit(): void {
    this.eskomApiService.getCurrentStatus().subscribe(res => console.log(res), err => console.log(err))
    this.eskomApiService.getMunicipalitiesByProvince(Province.GAUTENG).subscribe(res => console.log(res), err => console.log(err))
    this.eskomApiService.searchSuburbs('benoni').subscribe(res => console.log(res), err => console.log(err))
    this.eskomApiService.searchSuburbsInMunicipality(336, 'aard').subscribe(res => console.log(res), err => console.log(err))
    this.eskomApiService.getSuburbSchedule(62648, LoadsheddingStage.STAGE_3).subscribe(res => console.log(res), err => console.log(err))
    this.eskomApiService.getFullSuburbSchedule(62648).subscribe(res => console.log(res), err => console.log(err))
  }
  
}
