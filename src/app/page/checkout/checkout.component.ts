import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrderReq } from 'src/app/shared/interfaces/order';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IToping } from 'src/app/shared/interfaces/toping';
import { IUser } from 'src/app/shared/interfaces/user';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public minDate: Date;
  public maxDate: Date;
  public orderForm!: FormGroup<any>
  public user: IUser | null = null;
  public products: IProduct[] = [];
  public totalPrice = 0;
  public changesDetect: boolean = false;
  private subscription!: Subscription;
  public isValidate: boolean = false;
  public isAddress = false;
  public isTime = false;
  public selfPick = false;
  public comment = false;
  public money = true;
  public count = 0;
  public valid = {
    isAddress: false,
    isTime: false,
    selfPick: false,
    main: false
  }
  public totalBonus = 0;
  private api = environment.api.orders;
  public disable = false;

  constructor(private fb: FormBuilder,
    private ordersService: OrdersService,
    private db: DbDataService,
    private router: Router) {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 0, currentMonth, currentDay);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    }

  }

  ngOnInit(): void {
    this.initOrderForm();
    this.getCount();
    if (this.user) {
      this.orderForm.patchValue({
        tel: this.user.tel,
        name: this.user.name
      })
    }
    this.loadProducts();
    this.validationError();
    this.orderForm.valueChanges.subscribe(() => {
      this.toggleElements();
      this.validationError();
    });
    this.subscription = this.ordersService.basketChange.subscribe(() => {
      this.loadProducts();
    })
    this.toggleElements();
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      paymentType: ['cod'],
      deliveryType: ['true'],
      orderBefore: ['true'],
      name: ['', Validators.required],
      tel: ['', Validators.required],
      email: [''],
      date: [{ value: null, disabled: true }],
      timeInterval: ['1', { nonNullable: true }],
      ourAdress: ['1', { nonNullable: true }],
      city: ['1', { nonNullable: true }],
      street: [null],
      building: [null],
      enterence: [null],
      flat: [null],
      floor: [null],
      comment: [false],
      commentText: [null],
      recall: [false],
      rest: [null],
      restStatus: [false]
    })
  }

  createOrder(): void{
    this.disable = true;
    if(this.isValidate){
      let {name, email, tel, commentText, recall, rest, restStatus, deliveryType} = this.orderForm.value;
      let pay = this.createPayType();
      let address = this.createAdress();
      let date = this.createDateStr();
      let order: IOrderReq = {
        products: this.products,
        name: name,
        email: email ? email : 'Відсутній',
        tel: tel,
        payment: pay,
        deliveryTime: date,
        address: address,
        rest: rest && restStatus ? rest + 'грн' : 'Відсутня',
        deliveryType: deliveryType === 'true' ? 'Адресна доставка' : 'Самовивіз',
        recall,
        comment: commentText ? commentText : 'Відсутній',
        status: false,
        number: this.count + 1,
        userId: this.user ? this.user.id : 'anonim'
      }
      this.sendOrder(order);
    } else {
      this.disable = false;
    }
  }

  sendOrder(order: IOrderReq){
    this.db.create(this.api, order).then(() => {
      this.disable = false;
      this.ordersService.clear();
      this.router.navigateByUrl('/');
    })
    this.updateCount();
  }

  getCount(): void{
    this.db.getOne('count', 'number').subscribe((data) => {
      let number: number = data['value'] as number;
      this.count = number;
    },
    (e) =>{
      console.error(e)
    })
  }
  updateCount(): void{
    this.count = this.count + 1;
    this.db.update('count', 'number', {value: this.count} ).catch((e) => {
      console.error(e);
    })
  }

  createPayType(): string{
    let str = '';
    let current = this.getByControlName('paymentType');
    if(current === 'cod') str = 'Готівка';
    if(current === 'liqpay') str = 'Онлайн оплата';
    if(current === 'bacs') str = 'Оплата через термінал';
    return str;
  }

  loadProducts(): void {
    this.products = this.ordersService.getOrders();
    this.getTotal();
  }

  addEvent(e: MatDatepickerInputEvent<any, any>) {

    this.orderForm.patchValue({
      date: e.value
    })
  }

  getTotal(): void {
    let total = 0;
    this.products.forEach(item => {
      total += this.getFullPrice(item);
    })
    this.totalPrice = total;
    this.totalBonus = this.products
      .reduce((total: number, product: IProduct) => total + (product.count * product.bonus), 0);
  }

  getPrice(order: IProduct): number {
    let topPrice = order.topings
      ?.reduce((total: number, toping: IToping) => total + toping.price, 0);
    if (typeof topPrice === 'number' && topPrice >= 0) {
      return order.price + topPrice;
    }
    return order.price
  }

  getFullPrice(order: IProduct): number {
    let topPrice = order.topings
      ?.reduce((total: number, toping: IToping) => total + (order.count * toping.price), 0);
    if (typeof topPrice === 'number' && topPrice >= 0) {
      return order.price * order.count + topPrice;
    }
    return order.price * order.count
  }

  saveChanges(): void {
    if (this.changesDetect) {
      this.ordersService.save(this.products);
      this.changesDetect = false;
    }
  }

  setAmount(sign: boolean, product: IProduct | { count: number }): void {
    this.changesDetect = true;
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
    this.getTotal();
    this.saveChanges();
  }

  delete(item: IProduct): void {
    this.ordersService.delete(item);
  }

  removeToping(order: IProduct, toping: IToping): void {
    this.changesDetect = true;
    let index = order.topings?.findIndex(el => el.id === toping.id);
    if (typeof index === 'number') order.topings?.splice(index, 1);
    this.getTotal();
    this.saveChanges();
  }

  getByControlName(name: string): string {
    return String(this.orderForm.get(name)?.value)
  }

  getControlByName(name: string): AbstractControl {
    return this.orderForm.get(name) as AbstractControl
  }

  validationError(): void {
    this.isValidate = true;

    if (this.getByControlName('name') === '' || this.getByControlName('tel') === '') {
      this.isValidate = false;
      this.valid.main = true
    } else {
      this.valid.main = false;
    }

    if (this.getByControlName('orderBefore') === 'false' &&
      (this.getByControlName('date') === 'null' || this.getByControlName('timeInterval') == '1')) {
      this.isValidate = false;
      this.valid.isTime = true;
    } else {
      this.valid.isTime = false;
    }

    if (this.getByControlName('deliveryType') === 'true' &&
      (this.getByControlName('street') === 'null' || this.getByControlName('building') === 'null')) {
      this.isValidate = false;
      this.valid.isAddress = true;
    } else {
      this.valid.isAddress = false;
    }

    if (this.getByControlName('deliveryType') === 'false' && this.getByControlName('ourAdress') === '1') {
      this.isValidate = false;
      this.valid.selfPick = true;
    } else {
      this.valid.selfPick = false;
    }
  }

  toggleElements(): void {
    if (this.getByControlName('orderBefore') === 'true') {
      this.isTime = true;
    } else {
      this.isTime = false;
    }

    if (this.getByControlName('deliveryType') === 'true') {
      this.isAddress = true;
    } else {
      this.isAddress = false;
    }

    if (this.getByControlName('deliveryType') === 'false') {
      this.selfPick = true;
    } else {
      this.selfPick = false;
    }

    if (this.getByControlName('paymentType') === 'cod') {
      this.money = true;
    } else {
      this.money = false;
    }

    if (this.getByControlName('comment') === 'true') {
      this.comment = true;
    } else {
      this.comment = false;
    }
  }

  createAdress(): string{
    let {ourAdress, street, building, enterence, flat, city, deliveryType} = this.orderForm.value;
    if(ourAdress !== '1' && deliveryType === 'false'){
      return ourAdress;
    }
    let result = 'м.';
    [street, building, enterence, flat].forEach(a => {
      if(a === null){
        a = '';
      }
    })
    if(street && city){
      result += city + ' вул.' + street + ' ' + building
    }
    if(enterence) result += ' ' + enterence;
    if(flat) result += '/'+ flat
    return result
  }

  createDateStr(): string{
    let result ='';
    if(this.getByControlName('orderBefore') === 'false'){
      result = this.createDate(this.getControlByName('date').value, false)

    } else {
      result = this.createDate(new Date(), true)
    }
    return result;
  }

  createDate(date: Date, type: boolean): string{
      let year = date.getFullYear();
      let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}`: `${date.getMonth() + 1}`;
      let day = date.getDate() < 10 ? `0${date.getDate()}`: `${date.getDate()}`;
      let hours = date.getHours() < 10 ? `0${date.getHours()}`: `${date.getHours()}`;
      let min = date.getMinutes() < 10 ? `0${date.getMinutes()}`: `${date.getMinutes()}`;
      let str =  `${day}.${month}.${year} `;
      if(type){
        str += `${hours}:${min}`;
      } else{
        str += this.getByControlName('timeInterval');
      }
      return str;
  }

}
