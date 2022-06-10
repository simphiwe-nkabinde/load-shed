import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaPageRoutingModule } from './area-routing.module';

import { AreaPage } from './area.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AreaPage],
})
export class AreaPageModule {}
