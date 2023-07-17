import { TestBed } from '@angular/core/testing';

import { VacancyResolver } from './vacancy.resolver';

describe('VacancyResolver', () => {
  let resolver: VacancyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VacancyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
