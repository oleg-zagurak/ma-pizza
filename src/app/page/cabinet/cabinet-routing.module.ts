import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';

const routes: Routes = [
    {
        path: '', component: CabinetComponent, children: [
            {
                path: 'info',
                loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
            },
            {
                path: 'history',
                loadChildren: () => import('./history/history.module').then(m => m.HistoryModule)
            },
            {
                path: 'password',
                loadChildren: () => import('./password/password.module').then(m => m.PasswordModule)
            },
            {
                path: 'favorite',
                loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule)
            },
            { path: '', pathMatch: 'full', redirectTo: 'info' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CabinetRoutingModule { }