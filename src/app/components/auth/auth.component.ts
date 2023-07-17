import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  public state = false;
  public isLogged = false;
  public name = '';
  private user!: IUser;

  constructor(private auth: AuthService,
    private modal: ModalService,
    private router: Router) {
      this.router.events.subscribe(e => {
        if (e instanceof NavigationStart){
          this.closeOnNavigate();
        }
      })
    }

  ngOnInit(): void {
    this.auth.authSubject?.subscribe((mode: boolean) => {
      if (mode) {
        this.isLogged = this.auth.isLogged;
        if (localStorage.getItem('currentUser')) {
          this.user = JSON.parse(localStorage.getItem('currentUser') as string)
        }
      } else {
        this.resetOnLogout();
        location.reload()
      }
    })
    if (this.user && this.isLogged) {
      this.name = `${this.user.name} ${this.user.surname}`;
    }
  }

  logout(): void {
    this.auth.logout();
  }

  resetOnLogout(): void {
    this.isLogged = false;
    this.state = false;
  }

  showModal(): void{
    this.modal.toggleAuthPopup();
  }

  showSecNav(): void {
    if (this.isLogged) {
      this.state = !this.state;
    }
  }

  closeOnNavigate(): void {
    this.state = false;
  }
}
