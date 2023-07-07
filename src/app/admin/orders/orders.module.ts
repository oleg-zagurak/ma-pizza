import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersRoutingModule } from './orders-routing.module';
import { AdminOrdersComponent } from './orders.component';



@NgModule({
  declarations: [AdminOrdersComponent],
  imports: [
    CommonModule,
    AdminOrdersRoutingModule
  ]
})
export class AdminOrdersModule { }
