import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ActionsRoutingModule } from './actions-routing.module';
import { ActionsComponent } from './actions.component';



@NgModule({
  declarations: [
    ActionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActionsRoutingModule
  ]
})
export class ActionsModule { }
