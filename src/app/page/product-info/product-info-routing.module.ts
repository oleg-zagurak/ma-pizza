import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productResolver } from 'src/app/shared/resolvers/product/producr.resolver';
import { ProductInfoComponent } from './product-info.component';


const routes: Routes = [
  {
    path: '', component: ProductInfoComponent, resolve: {product: productResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductInfoRoutingModule { }