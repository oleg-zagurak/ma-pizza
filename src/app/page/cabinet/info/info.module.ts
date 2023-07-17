import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';



@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfoRoutingModule
  ]
})
export class InfoModule { }
