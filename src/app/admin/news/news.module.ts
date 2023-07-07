import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNewsRoutingModule } from './news-routing.module';
import { AdminNewsComponent } from './news.component';



@NgModule({
  declarations: [AdminNewsComponent],
  imports: [
    CommonModule,
    AdminNewsRoutingModule
  ]
})
export class AdminNewsModule { }
