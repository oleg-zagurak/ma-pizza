import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';



@NgModule({
  declarations: [
    CareerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CareerRoutingModule
  ]
})
export class CareerModule { }
