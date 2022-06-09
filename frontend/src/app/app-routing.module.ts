import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'area',
    loadChildren: () => import('./pages/area/area.module').then( m => m.AreaPageModule)
  },
  {
    path: 'area-stages',
    loadChildren: () => import('./pages/area-stages/area-stages.module').then( m => m.AreaStagesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
