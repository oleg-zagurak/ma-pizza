import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  constructor(private store: Firestore) { }
  getAll(apiPath: string): Observable<DocumentData[]>{
    return collectionData( collection(this.store, apiPath), { idField: 'id' } );
  }
  getOne(apiPath: string, id: string): Observable<DocumentData>{
    const categoryDocumentReference = doc(this.store, `${apiPath}/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }
  create(apiPath: string, item: DocumentData): Promise<DocumentReference<DocumentData>>{
    return addDoc(collection(this.store, apiPath), item);
  }
  delete(apiPath: string, id: string): Promise<void>{
    const categoryDocumentReference = doc(this.store, `${apiPath}/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
  update(apiPath: string, id: string, item: DocumentData): Promise<void>{
    const categoryDocumentReference = doc(this.store, `${apiPath}/${id}`);
    return updateDoc(categoryDocumentReference, {...item});
  }
  getByCategory(apiPath: string, category: string): Observable<DocumentData[]> {
    const q = query(collection(this.store, apiPath), where('category', '==', `${category}`))
    return collectionData( q, { idField: 'id' } );
  }

  getByUser(apiPath: string, id: string): Observable<DocumentData[]> {
    const q = query(collection(this.store, apiPath), where('userId', '==', `${id}`))
    return collectionData( q, { idField: 'id' } );
  }

  getActions(apiPath: string, type: string): Observable<DocumentData[]>{
    const q = query(collection(this.store, apiPath), where(`${type}`, '==', true))
    return collectionData( q, { idField: 'id' } );
  }
}