import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrdersService } from '../orders/orders.service';
import { environment } from 'src/environments/environment';
import { IUserReq, ROLE } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api.users;
  public authSubject = new Subject<boolean>();
  private logged = false;
  constructor(private auth: Auth,
    private fr: Firestore,
    private router: Router,
    private orders: OrdersService) { }

  get isLogged(): boolean {
    return this.logged;
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = credential.user.uid;
    const docRef = doc(this.fr, this.api, uid);
    docData(docRef).subscribe((user) => {
      const currentUser = { ...user, id: uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.logged = true;
      this.orders.clear();
      if (user['role'] === ROLE.USER) this.router.navigateByUrl('/cabinet');
      if (user['role'] === ROLE.ADMIN) {
        this.router.navigateByUrl('/admin');
      }
      this.authSubject.next(true);
    },
      (e) => {
        console.error('subscribe error', e);
      }
    )
  }

  async register(email: string, password: string, userData: IUserReq): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = credential.user.uid;
    const user = {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      tel: userData.tel,
      role: ROLE.USER,
      orders: [],
      favorite: [],
      basket: []
    }
    const docRef = doc(this.fr, this.api, uid);
    setDoc(docRef, user)
      .then(() => {
        const currentUser = { ...user, id: uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.orders.clear();
        this.logged = true;
        this.authSubject.next(true);
        this.router.navigateByUrl('/cabinet');
      })
      .catch((e) => {
        console.error('setDoc', e);
      })
  }

  logout(): void {
    localStorage.clear();
    this.authSubject.next(false);
  }
}
