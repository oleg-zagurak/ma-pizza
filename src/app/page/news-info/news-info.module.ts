import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsInfoComponent } from './news-info.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { NewsInfoRoutingModule } from './news-info-routing.module';



@NgModule({
  declarations: [
    NewsInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsInfoRoutingModule
  ]
})
export class NewsInfoModule { }
