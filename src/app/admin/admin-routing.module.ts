import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            {
                path: 'actions',
                loadChildren: () => import('./actions/actions.module').then(m => m.AdminActionsModule)
            },
            {
                path: 'news',
                loadChildren: () => import('./news/news.module').then(m => m.AdminNewsModule)
            },
            {
                path: 'orders',
                loadChildren: () => import('./orders/orders.module').then(m => m.AdminOrdersModule)
            },
            {
                path: 'products',
                loadChildren: () => import('./products/products.module').then(m => m.AdminProductsModule)
            },
            {
                path: 'vacancy',
                loadChildren: () => import('./vacancy/vacancy.module').then(m => m.AdminVacancyModule)
            },
            {
                path: 'topings',
                loadChildren: () => import('./topings/topings.module').then(m => m.AdminTopingsModule)
            },
            { path: '', pathMatch: 'full', redirectTo: 'actions' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }