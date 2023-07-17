import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IUser } from 'src/app/shared/interfaces/user';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public orders: IOrder[] = [];
  public user: IUser;
  private api = environment.api.orders;

  constructor(private db: DbDataService){
    this.user = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void{
    this.db.getByUser(this.api, this.user.id).subscribe((data) => {
      this.orders = data as IOrder[];
    })
  }

  getTotal(order: IOrder): number{
    let sum = 0;
    order.products.forEach((element: IProduct) => {
      sum += element.price * element.count;
    });
    return sum;
  } 

}
