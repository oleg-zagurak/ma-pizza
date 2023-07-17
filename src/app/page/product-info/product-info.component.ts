import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categories } from 'src/app/shared/constants/categories';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IToping } from 'src/app/shared/interfaces/toping';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public product!: IProduct;
  public categoryName = '';
  public categoryPath = '';
  public totallPrice = 0;
  public totallTopingsPrice = 0;
  public imgModal = false;
  public addings = false;


  constructor(private ActivatedRoute: ActivatedRoute,
    private orders: OrdersService,
    private modal: ModalService) { }

  ngOnInit(): void {
    const subscription = this.ActivatedRoute.data.subscribe({
      next: ({ product }) => {
        this.product = product as IProduct;
        this.categoryName = categories[this.product.category];
        this.product.category === 'pizza' ? this.categoryPath = '/' : this.categoryPath = `product/${this.product.category}`;
        this.product.topings ? this.addings = true : this.addings = false;
        this.getTotallPrice();
      },
      error: e => {
        console.error(e);
      },
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }

  setAmount(sign: boolean, product: IProduct | { count: number }): void {
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
    this.getTotallPrice();
  }

  addOrder(product: IProduct): void {
    this.orders.add(product);
  }

  showOrderModal(): void{
    this.modal.toggleOrderPopup();
  }

  chooseActiveToping(event: Event, toping: IToping): void {
    let item = event.currentTarget as HTMLElement;
    if (item) {
      item.classList.toggle('active');
      if (this.product.topings?.includes(toping)) {
        let index = this.product.topings.findIndex((el) => el.id === toping.id);
        this.product.topings?.splice(index, 1);
      } else if (item.classList.contains('active')) {
        this.product.topings?.push(toping);
      }
    }
    this.getTotallPrice()
  }

  getTotallPrice(): void {
    let topPrice = this.product.topings
      ?.reduce((total: number, toping: IToping) => total +  toping.price, 0);
    if (typeof topPrice === 'number' && topPrice >= 0) {
      this.totallTopingsPrice = topPrice;
      this.totallPrice = this.product.count * (this.product.price + topPrice);
      return
    }
    this.totallPrice = this.product.count * this.product.price;
  }

  removeSelectedToping(id: string): void {
    if (Array.isArray(this.product.topings)) {
      let index = this.product.topings.findIndex((el) => el.id === id);
      this.product.topings.splice(index, 1)
    }
    this.getTotallPrice();
  }

  removeAllTopings(): void {
    this.product.topings = [];
    this.getTotallPrice();
  }

  showFullSize(): void{
    this.imgModal = !this.imgModal;
  }

}
