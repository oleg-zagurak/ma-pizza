import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './static/header/header.component';
import { FooterComponent } from './static/footer/footer.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { BasketComponent } from './components/basket/basket.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/module/shared.module';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { HomeComponent } from './page/home/home.component';
import { ProductCategoryComponent } from './page/product-category/product-category.component';
import { CabinetComponent } from './page/cabinet/cabinet.component';
import { AdminAuthComponent } from './page/admin-auth/admin-auth.component';
import { BasketDialogComponent } from './components/basket-dialog/basket-dialog.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BasketComponent,
    AuthComponent,
    MainSliderComponent,
    HomeComponent,
    ProductCategoryComponent,
    CabinetComponent,
    AdminAuthComponent,
    BasketDialogComponent,
    AuthDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
