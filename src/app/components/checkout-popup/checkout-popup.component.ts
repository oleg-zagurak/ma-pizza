import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Component({
  selector: 'app-checkout-popup',
  templateUrl: './checkout-popup.component.html',
  styleUrls: ['./checkout-popup.component.scss']
})
export class CheckoutPopupComponent implements OnInit, OnDestroy {
  private subcription!: Subscription;
  public show = false;
  public title = '';

  constructor(private modal: ModalService) { }
  
  ngOnInit(): void {
    this.subcription = this.modal.checkoutPopupSubject.subscribe((str) => {
      this.title = str as string;
      if(!this.show){
        this.show = true;
        setTimeout(() => this.show = false, 3000)
      }
    })
  }
  ngOnDestroy(): void{
    this.subcription.unsubscribe();
  }

}
