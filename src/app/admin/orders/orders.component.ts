import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order';
import { IProduct } from 'src/app/shared/interfaces/product';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  public orders: IOrder[] = [];
  private api = environment.api.orders;

  constructor(private db: DbDataService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.db.getAll(this.api).subscribe((data) => {
      this.orders = data as IOrder[];
    })
  }
  getTopName(product: IProduct): string {
    let str = '';
    product.topings?.forEach(el => str += el.name + ', ');
    return str;
  }

  done(order: IOrder): void {
    order.status = true;
    this.db.update(this.api, order.id, order).then(() => {
      this.getOrders()
    },
      (e) => {
        console.error(e);
      })
  }
  delete(order: IOrder): void {
    this.db.delete(this.api, order.id).then(() => {
      this.getOrders()
    },
      (e) => {
        console.error(e);
      })
  }

}
