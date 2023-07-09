import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersRoutingModule } from './orders-routing.module';
import { AdminOrdersComponent } from './orders.component';
import { SharedModule } from 'src/app/shared/module/shared.module';



@NgModule({
  declarations: [AdminOrdersComponent],
  imports: [
    SharedModule,
    AdminOrdersRoutingModule
  ]
})
export class AdminOrdersModule { }
