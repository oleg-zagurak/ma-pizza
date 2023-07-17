import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';



@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PasswordRoutingModule
  ]
})
export class PasswordModule { }
