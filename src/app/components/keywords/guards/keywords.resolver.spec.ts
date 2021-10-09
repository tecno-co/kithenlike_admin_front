import { TestBed } from '@angular/core/testing';

import { KeywordsResolver } from './keywords.resolver';

describe('KeywordsResolver', () => {
  let resolver: KeywordsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(KeywordsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
