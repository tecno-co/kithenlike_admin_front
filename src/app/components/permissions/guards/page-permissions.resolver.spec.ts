import { TestBed } from '@angular/core/testing';

import { PagePermissionsResolver } from './page-permissions.resolver';

describe('PagePermissionsResolver', () => {
  let resolver: PagePermissionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PagePermissionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
