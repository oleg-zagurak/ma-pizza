import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';



@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
