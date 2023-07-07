import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminVacancyComponent } from './vacancy.component';
import { AdminVacancyRoutingModule } from './vacancy-routing.module';



@NgModule({
  declarations: [AdminVacancyComponent],
  imports: [
    CommonModule,
    AdminVacancyRoutingModule
  ]
})
export class AdminVacancyModule { }
