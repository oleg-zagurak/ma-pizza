import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { KontaktyRoutingModule } from './kontakty-routing.module';
import { KontaktyComponent } from './kontakty.component';



@NgModule({
  declarations: [
    KontaktyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KontaktyRoutingModule
  ]
})
export class KontaktyModule { }
