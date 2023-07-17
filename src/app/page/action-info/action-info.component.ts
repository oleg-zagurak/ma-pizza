import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAction } from 'src/app/shared/interfaces/action';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent implements OnInit {
  public action!: IAction;
  public description: string[] = [];

  constructor(private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const subscription = this.ActivatedRoute.data.subscribe({
      next: ({ action }) => {
        this.action = action as IAction;
        this.description = this.action.description.split('<br>');
      },
      error: e => {
        console.error(e);
      },
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }

}
