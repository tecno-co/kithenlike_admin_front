import { TestBed } from '@angular/core/testing';

import { KeywordsListResolver } from './keywords-list.resolver';

describe('KeywordsListResolver', () => {
  let resolver: KeywordsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(KeywordsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
