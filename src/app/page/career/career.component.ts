import { Component, OnInit } from '@angular/core';
import { IVacancy } from 'src/app/shared/interfaces/vacancy';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  private api = environment.api.vacancies;
  public vacancies: IVacancy[] = [];

  constructor(private db: DbDataService) { }

  ngOnInit(): void {
    this.db.getAll(this.api).subscribe((data) => {
      this.vacancies = data as IVacancy[]
    },
    (e) => {
      console.error(e);
    })
  }

}
