import { TestBed } from '@angular/core/testing';

import { RolesListResolver } from './roles-list.resolver';

describe('RolesListResolver', () => {
  let resolver: RolesListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RolesListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
