import { Injectable } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  private progress = 0;
  constructor(private storage: Storage) { }

  async uploadFile(folder: string[], name: string, file: File | null): Promise<string> {
    const path = `${folder.join('/')}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.progress = Math.trunc(data.progress);
        })
        await task;
        url = await getDownloadURL(storageRef);
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error('file missed')
    }
    return Promise.resolve(url);
  }

  deleteImg(url: string): Promise<void> {
    const task = ref(this.storage, url);
    return deleteObject(task);
  }

  get percentage(): number{
    return this.progress;
  }
  set percentage(count: number){
    this.progress = count;
  }
}
