import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacancyInfoComponent } from './vacancy-info.component';
import { vacancyResolver } from 'src/app/shared/resolvers/vacancy/vacancy.resolver';


const routes: Routes = [
  {
    path: '', component: VacancyInfoComponent, resolve: {vacancy: vacancyResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacancyInfoRoutingModule { }