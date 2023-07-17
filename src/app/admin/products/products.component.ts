import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct, IProductReq } from 'src/app/shared/interfaces/product';
import { IToping } from 'src/app/shared/interfaces/toping';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public productForm!: FormGroup;
  public products: IProduct[] = [];
  public topings: IToping[] = [];
  public formOpened = false;
  public progress = 0;
  public isUploaded = false;
  public editable = false;
  private currentId = '';
  public showSubSaladsCategories = false;
  public showSubPizzaCategories = false;
  private api = environment.api.products;

  constructor(private db: DbDataService,
    private fb: FormBuilder,
    private uploadImage: UploadImageService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTopings();
    this.initForm();
  }

  ngDoCheck(): void {
    if (this.progress !== this.uploadImage.percentage) this.progress = this.uploadImage.percentage;
  }

  initForm(): void {
    this.productForm = this.fb.group({
      subcategory: [[], { nonNullable: true }],
      name: [null, Validators.required],
      recomendation: [[], { nonNullable: true }],
      imagePath: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      count: [1, { nonNullable: true }],
      bonus: [null, Validators.required],
      category: [null, Validators.required],
    })
  }

  compareOptions(option1: string, option2: string): boolean {
    return option1 && option2 ? option1 === option2 : option1 === option2;
  }

  compareTopings(option1: IToping, option2: IToping): boolean {
    return option1 && option2 ? option1.id === option2.id : option1 === option2;
  }

  getProducts(): void {
    this.db.getAll(this.api).subscribe({
      next: data => {
        this.products = data as IProduct[];
      },
      error: e => {
        console.error(e)
      }
    })
  }

  getTopings(): void {
    const subscription = this.db.getAll(environment.api.topings).subscribe({
      next: data => {
        this.topings = data as IToping[];
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }

  deleteProduct(id: string): void {
    let item = this.products.find(product => product.id === id);
    if (item) {
      this.uploadImage.deleteImg(item.imagePath);
      this.db.delete(this.api, id).then(() => {
        this.getProducts()
      })
        .catch((e) => {
          console.error(e)
        })
    }
  }

  createProduct(): IProductReq {
    let { name, imagePath, ingredients, category, price, weight, subcategory, count, bonus, recomendation } = this.productForm.value;
    if (!bonus) bonus = 0;

    let product: IProductReq = {
      name,
      imagePath,
      price,
      weight,
      bonus,
      ingredients,
      count,
      category,
      recomendation,
      subcategory
    };
    return product;
  }

  addProduct() {
    if (this.productForm.valid) {
      let product: IProductReq = this.createProduct();
      this.db.create(this.api, product).then(() => {
        this.getProducts()
      })
        .catch((e) => {
          console.error(e)
        })
      this.reset();
    }
  }

  editProduct(index: number): void {
    let { name, imagePath, id, recomendation, ingredients, category, price, weight, bonus, subcategory } = this.products[index];
    this.currentId = id;
    this.productForm.patchValue({
      recomendation,
      name,
      imagePath,
      ingredients,
      category,
      subcategory,
      price,
      weight,
      bonus
    })
    this.showSubCat(false);
    this.editable = true;
    this.formOpened = true;
    this.isUploaded = true;
  }
  updateProduct(): void {
    if (this.productForm.valid) {
      let product: IProductReq = this.productForm.value;
      this.db.update(this.api, this.currentId, product).then(() => {
        this.getProducts()
      })
        .catch((e) => {
          console.error(e)
        })
      this.reset();
    }
  }
  upload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File = files[0];
    if (file) {
      this.uploadImage.uploadFile(['images', 'products'], file.name, file)
        .then(url => {
          if (url) {
            this.productForm.patchValue({
              imagePath: url
            });
            this.isUploaded = true;
            this.uploadImage.percentage = 0;
          }
        })
    }
  }

  deleteImg(): void {
    let url = this.getByControl('imagePath');
    this.uploadImage.deleteImg(url)
      .then(() => {
        this.productForm.patchValue({
          imagePath: null
        })
        this.isUploaded = false;
        this.progress = 0;
      })
  }
  getByControl(name: string): string {
    return this.productForm.get(name)?.value;
  }
  getCurrentCategory(): string | null {
    return this.productForm.get('category')?.value;
  }
  showSubCat(clean: boolean = true) {
    let pizza = this.showSubPizzaCategories;
    let salads = this.showSubSaladsCategories;
    let category = this.getCurrentCategory();
    category === 'pizza' ? this.showSubPizzaCategories = true : this.showSubPizzaCategories = false;
    category === 'salads' ? this.showSubSaladsCategories = true : this.showSubSaladsCategories = false;
    if ((this.showSubPizzaCategories !== pizza || this.showSubSaladsCategories !== salads) && clean){
      this.productForm.patchValue({ subcategory: null });
    }
  }
  show(): void {
    if (!this.editable) {
      this.formOpened = !this.formOpened;
      this.productForm.reset();
    }
  }
  cancel(): void {
    this.reset();
  }
  private reset(): void {
    this.productForm.reset();
    this.formOpened = false;
    this.isUploaded = false;
    this.progress = 0;
    this.currentId = '';
    this.editable = false;
  }

}
