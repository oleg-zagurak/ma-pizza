import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public basketSubject = new Subject<void>();
  public checkoutPopupSubject = new Subject<string>();
  public orderSubject = new Subject<void>()
  public authSubject = new Subject<void>()
  constructor() { }

  toggleBasket(): void{
    this.basketSubject.next()
  }
  toggleCheckoutPopup(str: string): void{
    this.checkoutPopupSubject.next(str)
  }
  toggleOrderPopup(): void{
    this.orderSubject.next();
  }
  toggleAuthPopup(): void{
    this.authSubject.next()
  }
}
