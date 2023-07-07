import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './products.component';
import { AdminProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [AdminProductsComponent],
  imports: [
    CommonModule,
    AdminProductsRoutingModule
  ]
})
export class AdminProductsModule { }
