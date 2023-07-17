import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IToping } from 'src/app/shared/interfaces/toping';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public orders: IProduct[] = [];
  public totalPrice = 0;
  public totalCount = 0;
  public changesDetect: boolean = false;
  private subscription!: Subscription;

  constructor(private ordersService: OrdersService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadBasket();
    this.subscription = this.ordersService.basketChange.subscribe(() => {
      this.loadBasket();
    })
  }

  ngOnDestroy(): void {
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
  }

  getPrice(order: IProduct): number{
    let topPrice = order.topings
      ?.reduce((total: number, toping: IToping) => total + (order.count * toping.price), 0);
      if (typeof topPrice === 'number' && topPrice >= 0) {
        return order.price * order.count + topPrice;
      }
      return order.count * order.price
  }

  showModal(): void{
    this.modalService.toggleBasket();
  }

}
