import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IAction } from '../../interfaces/action';
import { DbDataService } from '../../services/database/db-data.service';
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core';

export const actionResolver: ResolveFn<IAction> = (route, state) => {
  const db = inject(DbDataService);
  return db.getOne(environment.api.actions, route.paramMap.get('id') as string) as Observable<IAction>;
};