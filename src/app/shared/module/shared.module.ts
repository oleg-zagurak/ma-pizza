import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';



import { ContactsComponent } from 'src/app/components/contacts/contacts.component';
import { CheckoutPopupComponent } from 'src/app/components/checkout-popup/checkout-popup.component';
import { OrderPopupComponent } from 'src/app/components/order-popup/order-popup.component';


const material = [
  MatIconModule,
  MatDatepickerModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    ContactsComponent,
    CheckoutPopupComponent,
    OrderPopupComponent
  ],
  imports: [
    ...material,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    ...material,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule,
    ContactsComponent,
    CheckoutPopupComponent,
    OrderPopupComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'uk' },
  ]
})
export class SharedModule { }
