import { NgModule } from '@angular/core';
import { AdminNewsRoutingModule } from './news-routing.module';
import { AdminNewsComponent } from './news.component';
import { SharedModule } from 'src/app/shared/module/shared.module';



@NgModule({
  declarations: [AdminNewsComponent],
  imports: [
    SharedModule,
    AdminNewsRoutingModule
  ]
})
export class AdminNewsModule { }
