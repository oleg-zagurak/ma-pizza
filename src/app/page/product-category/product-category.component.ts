import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { categories } from 'src/app/shared/constants/categories';
import { IProduct } from 'src/app/shared/interfaces/product';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  public products: IProduct[] = [];
  public filteredProducts: IProduct[] = [];
  public paramSubscription!: Subscription;
  public showcategoryHeader = false;
  public categoryName = '';
  public subIcon = false;
  public api!: string;
  @Input() homeLocation: boolean = false;
  constructor(private db: DbDataService,
    private orders: OrdersService,
    private activatedRoute: ActivatedRoute) {
    this.api = environment.api.products;
    this.paramSubscription = activatedRoute.params.subscribe({
      next: (param) => {
        if (param && param['category']) {
          this.getByCategory();
          this.filteredProducts = [];
          this.showcategoryHeader = true;
        }
      },
      error: e => {
        console.error(e)
      }
    })
  }

  ngOnInit(): void {
    if (this.homeLocation) {
      const subscription = this.db.getByCategory(this.api, 'pizza').subscribe({
        next: data => {
          this.products = data as IProduct[];
          this.categoryName = categories[this.products[0]?.category];
          this.showcategoryHeader = false;
          this.subIcon = true;
        },
        error: e => {
          console.error(e)
        },
        complete: () => {
          subscription.unsubscribe();
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  getByCategory(): void {
    let category = this.activatedRoute.snapshot.paramMap.get('category') as string;
    if(category === 'salads' || category === 'pizza'){
      this.subIcon = true;
    } else {
      this.subIcon = false;
    }
    const subscription = this.db.getByCategory(this.api, category).subscribe({
      next: data => {
        this.products = data as IProduct[];
        this.categoryName = categories[this.products[0]?.category];
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }

  setAmount(sign: boolean, product: IProduct | { count: number }): void {
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
  }

  addOrder(product: IProduct): void {
    this.orders.add(product);
  }

  checkActiveFilter(event: MouseEvent, container: HTMLUListElement): void {
    if (container instanceof HTMLUListElement && event.target instanceof HTMLLIElement) {
      let elements = Array.from(container.children);
      elements.forEach(element => {
        element.classList.remove('active');
      })
      let target = event.target;
      let filter = Number(target.dataset['filter']);
      this.filter(filter);
      target.classList.add('active');
    }
  }

  filter(filter: number): void {
    if (filter === 10) {
      this.filteredProducts = [];
      return
    }
    if (filter >= 0 || filter < 10) {
      this.filteredProducts = this.products.filter(product => product.subcategory?.includes(filter));
    }
  }

}
