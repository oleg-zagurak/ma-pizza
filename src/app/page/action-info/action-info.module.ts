import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ActionInfoRoutingModule } from './action-info-routing.module';
import { ActionInfoComponent } from './action-info.component';



@NgModule({
  declarations: [
    ActionInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActionInfoRoutingModule
  ]
})
export class ActionInfoModule { }
