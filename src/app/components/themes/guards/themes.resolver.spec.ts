import { TestBed } from '@angular/core/testing';

import { ThemesResolver } from './themes.resolver';

describe('ThemesResolver', () => {
  let resolver: ThemesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ThemesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
