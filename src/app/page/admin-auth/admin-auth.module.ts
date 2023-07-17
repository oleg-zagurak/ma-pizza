import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AdminAuthRoutingModule
  ]
})
export class AdminAuthModule { }
