import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminVacancyComponent } from './vacancy.component';


const routes: Routes = [
    {path: '', component: AdminVacancyComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminVacancyRoutingModule { }