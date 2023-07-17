import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DostavkaComponent } from './dostavka.component';


const routes: Routes = [
  {
    path: '', component: DostavkaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DostavkaRoutingModule { }