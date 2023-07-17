import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionInfoComponent } from './action-info.component';
import { actionResolver } from 'src/app/shared/resolvers/action/action.resolver';


const routes: Routes = [
  {
    path: '', component: ActionInfoComponent, resolve: { action: actionResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionInfoRoutingModule { }