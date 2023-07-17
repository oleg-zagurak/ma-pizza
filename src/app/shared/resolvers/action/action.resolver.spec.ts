import { TestBed } from '@angular/core/testing';

import { ActionResolver } from './action.resolver';

describe('ActionResolver', () => {
  let resolver: ActionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ActionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
