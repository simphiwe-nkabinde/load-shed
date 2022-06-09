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
    
  }

}
