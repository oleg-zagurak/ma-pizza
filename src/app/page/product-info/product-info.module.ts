import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoComponent } from './product-info.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ProductInfoRoutingModule } from './product-info-routing.module';



@NgModule({
  declarations: [
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductInfoRoutingModule
  ]
})
export class ProductInfoModule { }
