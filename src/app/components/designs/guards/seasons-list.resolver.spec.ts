import { TestBed } from '@angular/core/testing';

import { SeasonsListResolver } from './seasons-list.resolver';

describe('SeasonsListResolver', () => {
  let resolver: SeasonsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SeasonsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
