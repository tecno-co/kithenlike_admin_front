import { TestBed } from '@angular/core/testing';

import { CategoriesListResolver } from './categories-list.resolver';

describe('CategoriesListResolver', () => {
  let resolver: CategoriesListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoriesListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
