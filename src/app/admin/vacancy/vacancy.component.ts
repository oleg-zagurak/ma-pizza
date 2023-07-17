import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IVacancy, IVacancyReq } from 'src/app/shared/interfaces/vacancy';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class AdminVacancyComponent implements OnInit {
  public formOpened = false;
  public isUploaded = false;
  public editable = false;
  public progress = 0;
  private currentId = '';
  public vacancies: IVacancy[] = [];
  public topingsForm!: FormGroup;
  private api = environment.api.vacancies;

  constructor(private uploadImage: UploadImageService,
    private fb: FormBuilder,
    private db: DbDataService) { }

  ngOnInit(): void {
    this.initForm();
    this.getVacancies();
  }

  ngDoCheck(): void {
    if (this.progress !== this.uploadImage.percentage) this.progress = this.uploadImage.percentage;
  }

  initForm(): void {
    this.topingsForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  show(): void{
    if (!this.editable) this.formOpened = !this.formOpened;
    if(!this.editable && !this.formOpened){
      this.deleteImg();
      this.reset()
    }
  }

  getVacancies(): void {
    const subscription = this.db.getAll(this.api).subscribe({
      next: data => {
        this.vacancies = data as IVacancy[];
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }

  deleteVacancy(id: string): void {
    let item = this.vacancies.find(vacancy => vacancy.id === id);
    if (item) this.uploadImage.deleteImg(item.imagePath);
    this.db.delete(this.api, id).then(() => {
      this.getVacancies()
    })
      .catch((e) => {
        console.error(e);
      })
  }

  addVacancy() {
    if (this.topingsForm.valid) {
      let action: IVacancyReq = {
        ...this.topingsForm.value
      }
      this.db.create(this.api, action).then(() => {
        this.getVacancies();
      })
        .catch((e) => {
          console.error(e);
        })
      this.reset();
    }
  }

  editVacancy(index: number): void {
    this.editable = true;
    let { title, imagePath, id, description } = this.vacancies[index];
    this.currentId = id;
    this.topingsForm.patchValue({
      title,
      imagePath,
      description,
    })
    this.formOpened = true;
    this.isUploaded = true;
  }

  update(): void {
    if (this.topingsForm.valid) {
      let toping: IVacancyReq = {
        ...this.topingsForm.value
      };
      this.db.update(this.api, this.currentId, toping).then(() => {
        this.getVacancies();
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
