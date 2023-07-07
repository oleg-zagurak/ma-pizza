import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTopingsComponent } from './topings.component';
import { AdminTopingsRoutingModule } from './topings-router.module';



@NgModule({
  declarations: [
    AdminTopingsComponent
  ],
  imports: [
    CommonModule,
    AdminTopingsRoutingModule
  ]
})
export class AdminTopingsModule { }
