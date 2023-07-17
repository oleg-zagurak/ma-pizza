import { ResolveFn } from '@angular/router';
import { Observable} from 'rxjs';
import { IProduct } from '../../interfaces/product';
import { inject } from '@angular/core';
import { DbDataService } from '../../services/database/db-data.service';
import { environment } from 'src/environments/environment';

export const productResolver: ResolveFn<IProduct> = (route, state) => {
  const db = inject(DbDataService);
  return db.getOne(environment.api.products, route.paramMap.get('id') as string) as Observable<IProduct>;
};
