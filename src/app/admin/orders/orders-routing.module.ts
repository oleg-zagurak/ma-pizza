import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './orders.component';


const routes: Routes = [
    {path: '', component: AdminOrdersComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminOrdersRoutingModule { }