import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTopingsComponent } from './topings.component';


const routes: Routes = [
    {path: '', component: AdminTopingsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminTopingsRoutingModule { }