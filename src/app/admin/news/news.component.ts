import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INews, INewsReq } from 'src/app/shared/interfaces/news';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class AdminNewsComponent implements OnInit, DoCheck {
  public modalOpened = false;
  public imageModal = false;
  public anchorModal = false;
  public anchorForm!: FormGroup;
  public imageForm!: FormGroup;
  public mainForm!: FormGroup;
  public isUploaded = false;
  public isUploadedModal = false;
  public editable = false;
  public progress = 0;
  public progressModal = 0;
  private api = environment.api.news;
  public news: INews[] = [];
  public content = '';
  public formOpened = false;
  private currentId = '';

  @ViewChild('area') area!: ElementRef<HTMLTextAreaElement>;

  constructor(private fb: FormBuilder,
    private uploadImage: UploadImageService,
    private db: DbDataService) { }

  ngOnInit(): void {
    this.initForms()
    this.getNews();
  }

  ngDoCheck(): void {
    if (this.progress !== this.uploadImage.percentage && !this.imageModal) this.progress = this.uploadImage.percentage;
    if (this.progressModal !== this.uploadImage.percentage && this.imageModal) this.progressModal = this.uploadImage.percentage;
  }

  getNews(): void {
    const subscription = this.db.getAll(this.api).subscribe({
      next: data => {
        this.news = data as INews[];
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }

  addNews(): void {
    if (this.mainForm.valid) {
      let news: INewsReq = { ...this.mainForm.value };
      this.db.create(this.api, news).then(() => {
        this.getNews();
      })
        .catch((e) => {
          console.error(e);
        })
      this.mainForm.reset();
      this.formOpened = false;
      this.progress = 0;
    }
  }

  deleteNews(id: string): void {
    let item = this.news.find(novelty => novelty.id === id);
    if (item) this.uploadImage.deleteImg(item.titleImage);
    this.db.delete(this.api, id).then(() => {
      this.getNews()
    })
      .catch((e) => {
        console.error(e);
      })
  }

  editNews(index: number): void {
    this.editable = true;
    let { content, title, titleImage, id } = this.news[index];
    this.currentId = id;
    this.mainForm.patchValue({
      title,
      titleImage,
      content
    })
    this.formOpened = true;
    this.isUploaded = true;
  }

  updateNews(): void {
    if (this.mainForm.valid) {
      let news: INews = { ...this.mainForm.value };
      this.db.update(this.api, this.currentId, news).then(() => {
        this.getNews();
      })
        .catch((e) => {
          console.error(e)
        })
      this.editable = false;
      this.formOpened = false;
      this.progress = 0;
      this.mainForm.reset();
    }
  }

  showForm(): void {
    if (!this.editable) this.formOpened = !this.formOpened;
  }

  showModal(choose: boolean): void {
    this.anchorForm.reset();
    this.imageForm.reset()
    this.modalOpened = !this.modalOpened;
    this.progressModal = 0;
    choose ? this.anchorModal = true : this.imageModal = true;
  }

  close(): void {
    this.anchorForm.reset();
    this.imageForm.reset();
    this.anchorModal = this.imageModal = false;
    this.modalOpened = false;
    this.isUploadedModal = false;
    this.progressModal = 0;
  }

  initForms(): void {
    this.anchorForm = this.fb.group({
      url: [null, Validators.required],
      title: [null, Validators.required]
    })

    this.imageForm = this.fb.group({
      imagePath: [null, Validators.required]
    })

    this.mainForm = this.fb.group({
      titleImage: [null, Validators.required],
      title: [null, Validators.required],
      content: [null, Validators.required]
    })
    this.mainForm.valueChanges.subscribe(() => {
      this.content = this.getByMainForm('content');
    })
  }

  upload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File = files[0];
    if (file) {
      this.uploadImage.uploadFile(['images', 'news'], file.name, file)
        .then(url => {
          if (url) {
            if (this.imageModal) {
              this.imageForm.patchValue({
                imagePath: url
              });
              this.isUploadedModal = true;
            } else {
              this.mainForm.patchValue({
                titleImage: url
              })
              this.isUploaded = true;
            }

            this.uploadImage.percentage = 0;
          }
        })
        .catch(e => {
          console.error(e);
        })
    }
  }

  deleteImg(): void {
    let path = this.getByImageForm() || this.getByMainForm('titleImage');
    this.uploadImage.deleteImg(path)
      .then(() => {
        if (this.imageModal) {
          this.imageForm.patchValue({
            imagePath: ''
          })
          this.isUploadedModal = false;
          this.progressModal = 0;
        } else {
          this.mainForm.patchValue({
            titleImage: ''
          })
          this.isUploaded = false;
          this.progress = 0;
        }
      })
  }

  getByImageForm(): string {
    return this.imageForm.get('imagePath')?.value;
  }

  getByMainForm(name: string): string {
    return this.mainForm.get(name)?.value;
  }

  addElement(type: string, tag?: string) {
    let area = this.area.nativeElement;
    let startPos = area.selectionStart;
    let endPos = area.selectionEnd;
    let element = '';
    tag !== undefined ? element = tag : element = `<${type}></${type}>`;
    area.value = area.value.substring(0, startPos) + element + area.value.substring(endPos, area.value.length);
    area.focus();
    area.selectionEnd = (startPos == endPos) ? (endPos + element.length) : endPos;
  }

  addEnchor(): void {
    let { url, title } = this.anchorForm.value;
    let elem = `<a href="${url}">${title}</a>`;
    this.addElement('a', elem);
    this.close();
  }
  addImage(): void {
    let { imagePath } = this.imageForm.value;
    let elem = `<img src="${imagePath}">`;
    this.addElement('img', elem);
    this.close();
  }

}
