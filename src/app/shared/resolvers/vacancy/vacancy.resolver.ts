import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IVacancy } from '../../interfaces/vacancy';
import { inject } from '@angular/core';
import { DbDataService } from '../../services/database/db-data.service';
import { environment } from 'src/environments/environment';

export const vacancyResolver: ResolveFn<IVacancy> = (route, state) => {
  const db = inject(DbDataService);
  return db.getOne(environment.api.vacancies, route.paramMap.get('id') as string) as Observable<IVacancy>;
};
