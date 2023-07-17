import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public user: IUser;

  constructor(){
    this.user = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit(): void {
  }

}
