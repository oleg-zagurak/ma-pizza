import { NgModule } from '@angular/core';
import { AdminProductsComponent } from './products.component';
import { AdminProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/module/shared.module';



@NgModule({
  declarations: [AdminProductsComponent],
  imports: [
    SharedModule,
    AdminProductsRoutingModule
  ]
})
export class AdminProductsModule { }
