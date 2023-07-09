import { NgModule } from '@angular/core';
import { AdminActionsRoutingModule } from './actions-routing.module';
import { AdminActionsComponent } from './actions.component';
import { SharedModule } from 'src/app/shared/module/shared.module';



@NgModule({
  declarations: [AdminActionsComponent],
  imports: [
    AdminActionsRoutingModule,
    SharedModule
  ]
})
export class AdminActionsModule { }
