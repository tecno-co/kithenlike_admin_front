import { TestBed } from '@angular/core/testing';

import { AllMenuPagesResolver } from './all-menu-pages.resolver';

describe('AllMenuPagesResolver', () => {
  let resolver: AllMenuPagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllMenuPagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
