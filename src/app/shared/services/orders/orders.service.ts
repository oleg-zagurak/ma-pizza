import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../../interfaces/product';
import { IUser } from '../../interfaces/user';
import { ModalService } from '../modal/modal.service';
import { IToping } from '../../interfaces/toping';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public basketChange: Subject<boolean> = new Subject();
  constructor(private modal:ModalService) { }

  add(order: IProduct): void {
    let orders: IProduct[] = [];
    if (localStorage.length > 0 && localStorage.getItem('orders')) {
      orders = JSON.parse(localStorage.getItem('orders') as string);
      let indexNum;
      let match = orders.find((el, index) => {
        indexNum = index;
        return this.deepEqual(el, order);
      });
      if (match && typeof indexNum === 'number') {
        orders[indexNum].count += order.count;
      } else {
        orders.push(order)
      }
    } else {
      orders.push(order)
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    order.count = 1;
    this.basketChange.next(true);
    this.modal.toggleCheckoutPopup(order.name);
  }

  addToUser(): void{
    let user: IUser | null = null;
    if(localStorage.getItem('currentUser')) user = JSON.parse(localStorage.getItem('currentUser') as string);
    if(user){
      
    }
  }
  getOrders(): IProduct[] {
    let orders: IProduct[] = [];
    if (localStorage.length > 0 && localStorage.getItem('orders')) {
      orders = JSON.parse(localStorage.getItem('orders') as string);
    }
    return orders;
  }

  save(ordersList: IProduct[]): void {
    localStorage.setItem('orders', JSON.stringify(ordersList));
    this.basketChange.next(true);
  }

  delete(order: IProduct): void {
    let orders: IProduct[] = JSON.parse(localStorage.getItem('orders') as string);
    let indexNum;
      let match = orders.find((el, index) => {
        indexNum = index;
        return this.deepEqual(el, order);
      });
      if (match && typeof indexNum === 'number') {
      orders.splice(indexNum, 1);
      localStorage.setItem('orders', JSON.stringify(orders));
      this.basketChange.next(true);
    } else {
      throw new Error('Product doesn\'t exist');
    }
  }
  clear(): void{
    localStorage.removeItem('orders');
    this.basketChange.next(true);
  }

  private deepEqual(obj1: any, obj2: any): boolean {
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return obj1 === obj2;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      if(key === 'count') {
        continue;
      }
      if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
  }
}
