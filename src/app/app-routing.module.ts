import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductCategoryComponent } from './page/product-category/product-category.component';
import { UserGuard } from './shared/guards/user.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'product/:category', component: ProductCategoryComponent
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./page/product-info/product-info.module').then(m => m.ProductInfoModule)
  },
  {
    path: 'admin', canActivate: [UserGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth', 
    loadChildren: () => import('./page/admin-auth/admin-auth.module').then(m => m.AdminAuthModule)
  },
  {
    path: 'cabinet', canActivate: [UserGuard],
    loadChildren: () => import('./page/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./page/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./page/actions/actions.module').then(m => m.ActionsModule)
  },
  {
    path: 'action/:id',
    loadChildren: () => import('./page/action-info/action-info.module').then(m => m.ActionInfoModule)
  },
  {
    path: 'career',
    loadChildren: () => import('./page/career/career.module').then(m => m.CareerModule)
  },
  {
    path: 'vacancy/:id',
    loadChildren: () => import('./page/vacancy-info/vacancy-info.module').then(m => m.VacancyInfoModule)
  },
  {
    path: 'dostavka',
    loadChildren: () => import('./page/dostavka/dostavka.module').then(m => m.DostavkaModule)
  },
  {
    path: 'kontakty',
    loadChildren: () => import('./page/kontakty/kontakty.module').then(m => m.KontaktyModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./page/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'news/:id',
    loadChildren: () => import('./page/news-info/news-info.module').then(m => m.NewsInfoModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./page/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {path: 'logout', pathMatch: 'full', redirectTo: ''},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
