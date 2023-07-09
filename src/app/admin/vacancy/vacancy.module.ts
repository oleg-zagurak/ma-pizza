import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminVacancyComponent } from './vacancy.component';
import { AdminVacancyRoutingModule } from './vacancy-routing.module';
import { SharedModule } from 'src/app/shared/module/shared.module';



@NgModule({
  declarations: [AdminVacancyComponent],
  imports: [
    SharedModule,
    AdminVacancyRoutingModule
  ]
})
export class AdminVacancyModule { }
