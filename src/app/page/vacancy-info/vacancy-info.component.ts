import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVacancy } from 'src/app/shared/interfaces/vacancy';

@Component({
  selector: 'app-vacancy-info',
  templateUrl: './vacancy-info.component.html',
  styleUrls: ['./vacancy-info.component.scss']
})
export class VacancyInfoComponent implements OnInit {
  public vacancy!: IVacancy;
  public description: string[] = [];

  constructor(private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const subscription = this.ActivatedRoute.data.subscribe({
      next: ({ vacancy }) => {
        this.vacancy = vacancy as IVacancy;
        this.description = this.vacancy.description.split('<br>');
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
