import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { DostavkaRoutingModule } from './dostavka-routing.module';
import { DostavkaComponent } from './dostavka.component';



@NgModule({
  declarations: [
    DostavkaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DostavkaRoutingModule
  ]
})
export class DostavkaModule { }
