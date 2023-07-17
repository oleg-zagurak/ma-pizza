import { Component, OnInit } from '@angular/core';
import { IAction } from 'src/app/shared/interfaces/action';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  private api = environment.api.actions;
  public actions: IAction[] = [];
  constructor(private db:DbDataService) { }

  ngOnInit(): void {
    this.db.getActions(this.api, 'forActions').subscribe((data) => {
      this.actions = data as IAction[];
    },
    (e) =>{
      console.error(e);
    })
  }

}
