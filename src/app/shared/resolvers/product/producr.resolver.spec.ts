import { TestBed } from '@angular/core/testing';

import { ProducrResolver } from './producr.resolver';

describe('ProducrResolver', () => {
  let resolver: ProducrResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProducrResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
