import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminActionsRoutingModule } from './actions-routing.module';
import { AdminActionsComponent } from './actions.component';



@NgModule({
  declarations: [AdminActionsComponent],
  imports: [
    CommonModule,
    AdminActionsRoutingModule
  ]
})
export class AdminActionsModule { }
