import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';



@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FavoriteRoutingModule
  ]
})
export class FavoriteModule { }
