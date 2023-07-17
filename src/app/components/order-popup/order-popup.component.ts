import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IToping } from 'src/app/shared/interfaces/toping';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {
  @Input() currentProduct!: IProduct;
  public topings: IToping[] = [];
  private api = environment.api.topings;
  public filteredTopings: IToping[] = [];
  public activeFilter = false;
  public totallPrice = 0;
  public totallTopingsPrice = 0;
  public show = false;


  constructor(private db: DbDataService, private order: OrdersService, private modal: ModalService) { }

  ngOnInit(): void {
    this.currentProduct.topings = [];
    this.db.getAll(this.api).subscribe((data) => {
      this.topings = data as IToping[];
      this.filterTopings('sousi');
      this.getTotallPrice()
    })
    this.modal.orderSubject.subscribe(() => this.show = !this.show)
  }

  showModal(): void{
    this.show = !this.show;
  }

  close(e:Event): void{
    let target = e.target as HTMLElement;
    if(target.classList.contains('layer-close')){
      this.showModal()
    }
  }

  chooseActiveToping(event: Event, toping: IToping): void {
    let item = event.currentTarget as HTMLElement;
    if (item) {
      item.classList.toggle('active');
      if (this.currentProduct.topings?.includes(toping)) {
        let index = this.currentProduct.topings.findIndex((el) => el.id === toping.id);
        this.currentProduct.topings?.splice(index, 1);
      } else if (item.classList.contains('active')) {
        this.currentProduct.topings?.push(toping);
      }
    }
    this.getTotallPrice()
  }

  getTotallPrice(): void {
    let topPrice = this.currentProduct.topings
      ?.reduce((total: number, toping: IToping) => total + (this.currentProduct.count * toping.price), 0);
    if (typeof topPrice === 'number' && topPrice >= 0) {
      this.totallTopingsPrice = topPrice;
      this.totallPrice = this.currentProduct.price * this.currentProduct.count + topPrice;
    }
  }

  setAmount(sign: boolean): void {
    if (sign) {
      ++this.currentProduct.count;
    } else if (!sign && this.currentProduct.count > 1) {
      --this.currentProduct.count;
    }
    this.getTotallPrice();
  }

  addOrder(): void {
    this.order.add(this.currentProduct);
  }

  filterTopings(filter: string): void {
    if (filter === 'sousi') {
      this.filteredTopings = this.topings.filter(toping => (toping.name).toLowerCase().includes('соус'));
      this.activeFilter = false;
    }
    if (filter === 'adds') {
      this.filteredTopings = this.topings.filter(toping => !(toping.name).toLowerCase().includes('соус'));
      this.activeFilter = true;
    }
  }

  removeSelectedToping(id: string): void {
    if (Array.isArray(this.currentProduct.topings)) {
      let index = this.currentProduct.topings.findIndex((el) => el.id === id);
      this.currentProduct.topings.splice(index, 1)
    }
    this.getTotallPrice();
  }
  removeAllTopings(): void {
    this.currentProduct.topings = [];
    this.getTotallPrice();
  }

}
