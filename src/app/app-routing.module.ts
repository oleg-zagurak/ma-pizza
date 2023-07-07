import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'admin', 
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
