import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActionsComponent } from './actions.component';

const routes: Routes = [
  {path: '', component: AdminActionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminActionsRoutingModule { }