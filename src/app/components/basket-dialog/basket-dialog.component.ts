import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IToping } from 'src/app/shared/interfaces/toping';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})
export class BasketDialogComponent implements OnInit {

  public modal = false;
  public orders: IProduct[] = [];
  public totalPrice = 0;
  public totalCount = 0;
  public totalBonus = 0;
  public changesDetect: boolean = false;
  private subscription!: Subscription;

  constructor(private ordersService: OrdersService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.loadBasket();
    this.subscription = this.ordersService.basketChange.subscribe(() => {
      this.loadBasket();
    })
    this.modalService.basketSubject.subscribe(() => {
      this.showModal();
    })
  }

  ngOnDestroy(): void {
    this.saveChanges();
    this.subscription?.unsubscribe();
  }

  loadBasket(): void {
    this.orders = this.ordersService.getOrders();
    this.getTotal();
  }

  getTotal(): void {
    let total = 0;
    this.orders.forEach(item => {
      total += this.getPrice(item)
    })
    this.totalPrice = total;
    this.totalCount = this.orders
      .reduce((total: number, product: IProduct) => total + product.count, 0);
    this.totalBonus = this.orders
      .reduce((total: number, product: IProduct) => total + (product.count * product.bonus), 0);
  }

  getPrice(order: IProduct): number{
    let topPrice = order.topings
      ?.reduce((total: number, toping: IToping) => total + (order.count * toping.price), 0);
      if (typeof topPrice === 'number' && topPrice >= 0) {
        return order.price * order.count + topPrice;
      }
      return order.count * order.price
  }

  delete(order: IProduct): void{
    this.ordersService.delete(order);
  }

  showModal(): void{
    this.modal = !this.modal;
  }

  close(e:Event): void{
    let target = e.target as HTMLElement;
    if(target.classList.contains('bg-wrapper')){
      this.showModal()
    }
  }

  removeToping(order: IProduct, toping: IToping): void{
    this.changesDetect = true;
    let index = order.topings?.findIndex(el => el.id === toping.id);
    if (typeof index === 'number') order.topings?.splice(index, 1);
    this.getTotal();
    this.saveChanges();
  }

  setAmount(sign: boolean, product: IProduct | {count: number}): void {
    this.changesDetect = true;
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
    this.getTotal();
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.changesDetect) {
      this.ordersService.save(this.orders);
      this.changesDetect = false;
    }
  }

}
