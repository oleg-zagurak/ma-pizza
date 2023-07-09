import { NgModule } from '@angular/core';
import { AdminTopingsComponent } from './topings.component';
import { AdminTopingsRoutingModule } from './topings-router.module';
import { SharedModule } from 'src/app/shared/module/shared.module';



@NgModule({
  declarations: [
    AdminTopingsComponent
  ],
  imports: [
    SharedModule,
    AdminTopingsRoutingModule
  ]
})
export class AdminTopingsModule { }
