import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAction, IActionReq } from 'src/app/shared/interfaces/action';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class AdminActionsComponent implements OnInit {
  public formOpened = false;
  public isUploaded = false;
  public editable = false;
  public progress = 0;
  private currentId = '';
  public actions: IAction[] = [];
  public actionsForm!: FormGroup;
  private api = environment.api.actions;
  public invalid = true;

  constructor(private uploadImage: UploadImageService,
    private fb: FormBuilder,
    private db: DbDataService) { }

  ngOnInit(): void {
    this.getActions();
    this.initForm();
    this.actionsForm.valueChanges.subscribe(() => {
      this.checkboxValidate();
    })
  }

  ngDoCheck(): void {
    if (this.progress !== this.uploadImage.percentage) this.progress = this.uploadImage.percentage;
  }

  initForm(): void {
    this.actionsForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['', { nonNullable: true }],
      imagePath: ['', Validators.required],
      forActions: [null],
      forCarousel: [null]
    })
  }

  show(): void{
    if (!this.editable) this.formOpened = !this.formOpened;
    if(!this.editable && !this.formOpened){
      this.deleteImg();
      this.reset()
    }
  }

  getActions(): void {
    const subscription = this.db.getAll(this.api).subscribe({
      next: data => {
        this.actions = data as IAction[];
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }

  deleteAction(id: string): void {
    let item = this.actions.find(action => action.id === id);
    if (item) this.uploadImage.deleteImg(item.imagePath);
    this.db.delete(this.api, id).then(() => {
      this.getActions()
    })
      .catch((e) => {
        console.error(e);
      })
  }

  addAction() {
    if (this.actionsForm.valid && this.checkboxValidate()) {
      let date = this.createDate();
      let action: IActionReq = {
        ...this.actionsForm.value,
        date: date
      }
      this.db.create(this.api, action).then(() => {
        this.getActions();
      })
        .catch((e) => {
          console.error(e);
        })
      this.reset();
    }
  }

  editAction(index: number): void {
    this.editable = true;
    let { shortDescription, name, description, imagePath, id, forActions, forCarousel } = this.actions[index];
    this.currentId = id;
    this.actionsForm.patchValue({
      shortDescription,
      name,
      description,
      imagePath,
      forActions,
      forCarousel
    })
    this.formOpened = true;
    this.isUploaded = true;
  }

  update(): void {
    if (this.actionsForm.valid && this.checkboxValidate()) {
      let date = this.createDate();
      let action: IAction = {
        ...this.actionsForm.value,
        date
      };
      this.db.update(this.api, this.currentId, action).then(() => {
        this.getActions();
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
      this.uploadImage.uploadFile(['images', 'actions'], file.name, file)
        .then(url => {
          if (url) {
            this.actionsForm.patchValue({
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
        this.actionsForm.patchValue({
          imagePath: ''
        })
        this.isUploaded = false;
        this.progress = 0;
      })
  }

  getByControl(name: string): string {
    return this.actionsForm.get(name)?.value;
  }

  checkboxValidate(): boolean{
    if(this.getByControl('forActions') || this.getByControl('forCarousel')){
      this.invalid = false;
      return true
    };
    this.invalid = true;
    return false;
  }

  createDate(): string {
    let date = new Date();
    let dateStr = '';
    date.getDate() < 10 ? dateStr += '0' + date.getDate() : dateStr += date.getDate();
    date.getMonth() < 10 ? dateStr += '.0' + (date.getMonth() + 1) : dateStr += '.' + (date.getMonth() + 1);
    date.getFullYear() < 10 ? dateStr += '.0' + date.getFullYear() : dateStr += '.' + date.getFullYear();
    return dateStr;
  }

  reset(): void {
    this.actionsForm.reset();
    this.formOpened = false;
    this.isUploaded = false;
    this.progress = 0;
    this.currentId = '';
    this.editable = false;
  }
}
