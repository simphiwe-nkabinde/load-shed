import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaStagesPage } from './area-stages.page';

const routes: Routes = [
  {
    path: '',
    component: AreaStagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaStagesPageRoutingModule {}
