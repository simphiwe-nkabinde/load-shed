import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaStagesPageRoutingModule } from './area-stages-routing.module';

import { AreaStagesPage } from './area-stages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaStagesPageRoutingModule
  ],
  declarations: [AreaStagesPage]
})
export class AreaStagesPageModule {}
