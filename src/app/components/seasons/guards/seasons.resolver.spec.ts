import { TestBed } from '@angular/core/testing';

import { SeasonsResolver } from './seasons.resolver';

describe('SeasonsResolver', () => {
  let resolver: SeasonsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SeasonsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
