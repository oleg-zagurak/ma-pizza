import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { VacancyInfoRoutingModule } from './vacancy-info-routing.module';
import { VacancyInfoComponent } from './vacancy-info.component';



@NgModule({
  declarations: [
    VacancyInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VacancyInfoRoutingModule
  ]
})
export class VacancyInfoModule { }
