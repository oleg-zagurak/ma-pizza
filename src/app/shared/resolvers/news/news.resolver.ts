import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { INews } from '../../interfaces/news';
import { DbDataService } from '../../services/database/db-data.service';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environment';

export const newsResolver: ResolveFn<INews> = (route, state) => {
  const db = inject(DbDataService);
  return db.getOne(environment.api.news, route.paramMap.get('id') as string) as Observable<INews>;
};
