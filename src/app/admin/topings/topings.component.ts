import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IToping, ITopingReq } from 'src/app/shared/interfaces/toping';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-topings',
  templateUrl: './topings.component.html',
  styleUrls: ['./topings.component.scss']
})
export class AdminTopingsComponent implements OnInit, DoCheck {
  public formOpened = false;
  public isUploaded = false;
  public editable = false;
  public progress = 0;
  private currentId = '';
  public topings: IToping[] = [];
  public topingsForm!: FormGroup;
  private api = environment.api.topings;

  constructor(private uploadImage: UploadImageService,
    private fb: FormBuilder,
    private db: DbDataService) { }

  ngOnInit(): void {
    this.initForm();
    this.getTopings();
  }

  ngDoCheck(): void {
    if (this.progress !== this.uploadImage.percentage) this.progress = this.uploadImage.percentage;
  }

  initForm(): void {
    this.topingsForm = this.fb.group({
      name: [null, Validators.required],
      weight: [null, Validators.required],
      count: [0, { nonNullable: true }],
      imagePath: ['', Validators.required],
      price: [null, Validators.required]
    })
  }

  show(): void{
    if (!this.editable) this.formOpened = !this.formOpened;
    if(!this.editable && !this.formOpened){
      this.deleteImg();
      this.reset()
    }
  }

  getTopings(): void {
    const subscription = this.db.getAll(this.api).subscribe({
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

  deleteToping(id: string): void {
    let item = this.topings.find(toping => toping.id === id);
    if (item) this.uploadImage.deleteImg(item.imagePath);
    this.db.delete(this.api, id).then(() => {
      this.getTopings()
    })
      .catch((e) => {
        console.error(e);
      })
  }

  addToping() {
    if (this.topingsForm.valid) {
      let action: ITopingReq = {
        ...this.topingsForm.value
      }
      this.db.create(this.api, action).then(() => {
        this.getTopings();
      })
        .catch((e) => {
          console.error(e);
        })
      this.reset();
    }
  }

  editToping(index: number): void {
    this.editable = true;
    let { name, imagePath, id, weight, price } = this.topings[index];
    this.currentId = id;
    this.topingsForm.patchValue({
      name,
      imagePath,
      weight,
      price
    })
    this.formOpened = true;
    this.isUploaded = true;
  }

  update(): void {
    if (this.topingsForm.valid) {
      let toping: ITopingReq = {
        ...this.topingsForm.value
      };
      this.db.update(this.api, this.currentId, toping).then(() => {
        this.getTopings();
      })
        .catch((e) => {
          console.error(e)
        })
      this.editable = false;
      this.reset();
    }
  }

  upload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File = files[0];
    if (file) {
      this.uploadImage.uploadFile(['images', 'topings'], file.name, file)
        .then(url => {
          if (url) {
            this.topingsForm.patchValue({
              imagePath: url
            });
            this.isUploaded = true;
            this.uploadImage.percentage = 0;
          }
        })
    }
  }

  deleteImg(): void {
    this.uploadImage.deleteImg(this.getByControl('imagePath'))
      .then(() => {
        this.topingsForm.patchValue({
          imagePath: ''
        })
        this.isUploaded = false;
        this.progress = 0;
      })
  }

  getByControl(name: string): string {
    return this.topingsForm.get(name)?.value;
  }

  reset(): void {
    this.topingsForm.reset();
    this.formOpened = false;
    this.isUploaded = false;
    this.progress = 0;
    this.currentId = '';
    this.editable = false;
  }

}
