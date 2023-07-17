import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CabinetRoutingModule
  ]
})
export class CabinetModule { }
